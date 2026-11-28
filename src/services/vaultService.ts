import { INITIAL_MOCK_VAULT } from "../tmp-data/mockVault";
import type {
  VaultItemDetail,
  VaultItemInput,
  VaultItemSummary,
} from "../types/vault";
import {
  evaluatePasswordStrength,
  generatePassphrase,
  generateRandomPassword,
} from "../utils/passwordStrength";

import { normalizeRecoverySecret, generateRecoveryWords } from "../utils/bip39";

export type VaultStatus = {
  exists: boolean;
  isUnlocked: boolean;
};

export type GeneratorOptions =
  | { kind: "passphrase"; wordCount: number; includeExtras: boolean }
  | { kind: "random"; length: number; includeSpecial: boolean };

export type AppSettings = {
  autoLockMinutes: number; // 0 = never
  clipboardClearSeconds: number;
};

// DEV: flip to test LockScreen / onboarding flows
const DEV_START = "unlocked" as "unlocked" | "locked" | "no-vault";

let mockDb = updateFlags([...INITIAL_MOCK_VAULT]);
let clipboardClearTimer: number | undefined;
let isUnlocked = DEV_START === "unlocked";
let vaultExists = DEV_START !== "no-vault";
let mockMasterPassword: string | null = null;
let mockSettings: AppSettings = {
  autoLockMinutes: 5,
  clipboardClearSeconds: 30,
};
let mockRecoverySecret =
  "royal-negative-napkin-crystal-action-sport-broccoli-frown-swear-pistol-tooth-unaware-spawn-tennis-plug-rule-leg-agent-pumpkin-aim-surge-injury-pelican-random";

function assertUnlocked(): void {
  if (!isUnlocked) throw new Error("Vault is locked");
}

function generateRecoverySecret(): string {
  return generateRecoveryWords(24);
}

function updateFlags(items: VaultItemDetail[]): VaultItemDetail[] {
  const counts = new Map<string, number>();
  for (const item of items) {
    if (item.deletedAt === null && item.password) {
      counts.set(item.password, (counts.get(item.password) ?? 0) + 1);
    }
  }

  return items.map((item) => ({
    ...item,
    isReused:
      item.deletedAt === null &&
      Boolean(item.password) &&
      (counts.get(item.password) ?? 0) > 1,
    isWeak: evaluatePasswordStrength(item.password).isWeak,
  }));
}

function toSummary(item: VaultItemDetail): VaultItemSummary {
  return {
    id: item.id,
    title: item.title,
    username: item.username,
    website: item.website,
    isFavorite: item.isFavorite,
    isReused: item.isReused,
    isWeak: item.isWeak,
    updatedAt: item.updatedAt,
    deletedAt: item.deletedAt,
  };
}

export async function getVaultSummaries(): Promise<VaultItemSummary[]> {
  assertUnlocked();
  return mockDb.map(toSummary);
}

export async function getVaultItemDetail(
  id: string,
): Promise<VaultItemDetail | null> {
  assertUnlocked();
  const item = mockDb.find((entry) => entry.id === id);
  if (!item) return null;

  const reusedWith =
    item.deletedAt === null && item.password
      ? mockDb
          .filter(
            (other) =>
              other.id !== item.id &&
              other.deletedAt === null &&
              other.password === item.password,
          )
          .map((other) => ({ id: other.id, title: other.title }))
      : [];
  return { ...item, reusedWith };
}

export async function createVaultItem(
  input: VaultItemInput,
): Promise<VaultItemSummary> {
  assertUnlocked();
  const now = Date.now();
  const created: VaultItemDetail = {
    ...input,
    id: crypto.randomUUID(),
    isReused: false,
    isWeak: false,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  };
  mockDb = updateFlags([created, ...mockDb]);
  return toSummary(mockDb.find((entry) => entry.id === created.id) ?? created);
}

export async function updateVaultItem(
  id: string,
  input: VaultItemInput,
): Promise<void> {
  assertUnlocked();
  mockDb = updateFlags(
    mockDb.map((entry) =>
      entry.id === id ? { ...entry, ...input, updatedAt: Date.now() } : entry,
    ),
  );
}

export async function toggleFavorite(id: string): Promise<void> {
  assertUnlocked();
  mockDb = mockDb.map((entry) =>
    entry.id === id
      ? { ...entry, isFavorite: !entry.isFavorite, updatedAt: Date.now() }
      : entry,
  );
}

export async function moveToTrash(id: string): Promise<void> {
  assertUnlocked();
  mockDb = updateFlags(
    mockDb.map((entry) =>
      entry.id === id ? { ...entry, deletedAt: Date.now() } : entry,
    ),
  );
}

export async function restoreFromTrash(id: string): Promise<void> {
  assertUnlocked();
  mockDb = updateFlags(
    mockDb.map((entry) =>
      entry.id === id ? { ...entry, deletedAt: null } : entry,
    ),
  );
}

export async function deletePermanently(id: string): Promise<void> {
  assertUnlocked();
  mockDb = updateFlags(mockDb.filter((entry) => entry.id !== id));
}

export async function getVaultStatus(): Promise<VaultStatus> {
  // TODO: Replace with Rust command checking vault file existence + in-memory Vault Key
  return { exists: vaultExists, isUnlocked };
}

export async function createVault(masterPassword: string): Promise<string> {
  // TODO: Replace with Rust Argon2id + HKDF-SHA256 + SQLite header creation
  if (masterPassword.trim().length === 0) {
    throw new Error("Master password cannot be empty");
  }
  vaultExists = true;
  isUnlocked = true;
  mockMasterPassword = masterPassword;
  mockDb = [];
  mockRecoverySecret = generateRecoverySecret();
  return mockRecoverySecret;
}

export async function unlockVault(masterPassword: string): Promise<boolean> {
  // TODO: Replace with Rust Argon2id Master Slot decryption
  const valid =
    vaultExists &&
    masterPassword.trim().length > 0 &&
    (mockMasterPassword === null || masterPassword === mockMasterPassword);
  isUnlocked = valid;
  return valid;
}

export async function changeMasterPassword(
  currentPassword: string,
  newPassword: string,
): Promise<boolean> {
  assertUnlocked();
  // TODO: Replace with Rust Argon2id verification + Master Slot re-wrap (Recovery Secret stays unchanged)
  if (currentPassword.trim().length === 0 || newPassword.trim().length === 0) {
    return false;
  }
  if (mockMasterPassword !== null && currentPassword !== mockMasterPassword) {
    return false;
  }
  mockMasterPassword = newPassword;
  return true;
}

export async function verifyRecoverySecret(
  recoverySecret: string,
): Promise<boolean> {
  // TODO: Replace with Rust HKDF-SHA256 Recovery Slot AEAD verification
  if (!vaultExists) return false;
  return (
    normalizeRecoverySecret(recoverySecret) ===
    normalizeRecoverySecret(mockRecoverySecret)
  );
}

export async function recoverVault(
  recoverySecret: string,
  newMasterPassword: string,
): Promise<boolean> {
  // TODO: Replace with Rust HKDF-SHA256 Recovery Key unwrap + Master Slot re-wrap
  const validSecret = await verifyRecoverySecret(recoverySecret);
  if (!validSecret || newMasterPassword.trim().length === 0) return false;

  mockMasterPassword = newMasterPassword;
  isUnlocked = true;
  return true;
}

export async function lockVault(): Promise<void> {
  // TODO: Replace with Rust Vault Key zeroization in RAM
  isUnlocked = false;
  await clearClipboard();
}

export async function copyItemSecret(
  id: string,
  field: "password" | "username",
): Promise<void> {
  assertUnlocked();
  // TODO: Replace with Rust command that decrypts straight to OS clipboard & zeroizes buffer
  const item = mockDb.find((entry) => entry.id === id);
  if (!item || !item[field]) return;
  await copyToClipboard(item[field]);
}

export async function copyToClipboard(text: string): Promise<void> {
  // TODO: Replace with Rust/Tauri clipboard command + backend timer
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // ignore possible errors for now
  }

  clearTimeout(clipboardClearTimer);
  clipboardClearTimer = window.setTimeout(
    clearClipboard,
    mockSettings.clipboardClearSeconds * 1000,
  );
}

export async function clearClipboard(): Promise<void> {
  clearTimeout(clipboardClearTimer);
  clipboardClearTimer = undefined;
  try {
    await navigator.clipboard.writeText("");
  } catch {
    // WebViews may block clipboard writes outside a user gesture
  }
}

export async function generatePassword(
  options: GeneratorOptions,
): Promise<string> {
  // TODO: Replace with Rust OsRng-based generator command
  return options.kind === "passphrase"
    ? generatePassphrase(options.wordCount, options.includeExtras)
    : generateRandomPassword(options.length, options.includeSpecial);
}

export async function getSettings(): Promise<AppSettings> {
  // TODO: Replace with Rust command reading settings from config / vault header
  return { ...mockSettings };
}

export async function updateSettings(
  patch: Partial<AppSettings>,
): Promise<AppSettings> {
  // TODO: Replace with Rust command persisting settings
  mockSettings = { ...mockSettings, ...patch };
  return { ...mockSettings };
}
