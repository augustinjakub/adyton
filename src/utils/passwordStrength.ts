import effWordlistRaw from "../assets/eff-wordlist.txt?raw";

const EFF_WORDS = effWordlistRaw.trim().split(/\s+/);

export type PasswordStrength = {
  score: 1 | 2 | 3 | 4;
  label: "Weak" | "Fair" | "Good" | "Strong";
  isWeak: boolean;
  entropyBits: number;
};

function randomInt(max: number): number {
  const limit = Math.floor(0x1_0000_0000 / max) * max;
  const buf = new Uint32Array(1);
  do {
    crypto.getRandomValues(buf);
  } while (buf[0] >= limit);

  return buf[0] % max;
}

const LABELS = { 1: "Weak", 2: "Fair", 3: "Good", 4: "Strong" } as const;

export function evaluatePasswordStrength(password: string): PasswordStrength {
  if (!password)
    return { score: 1, label: "Weak", isWeak: true, entropyBits: 0 };

  let pool = 0;
  let classes = 0;

  if (/[a-z]/.test(password)) {
    pool += 26;
    classes += 1;
  }
  if (/[A-Z]/.test(password)) {
    pool += 26;
    classes += 1;
  }
  if (/\d/.test(password)) {
    pool += 10;
    classes += 1;
  }
  if (/[^a-zA-Z0-9]/.test(password)) {
    pool += 32;
    classes += 1;
  }

  const effectiveLength = Math.min(
    password.length,
    new Set(password).size * 1.4,
  );
  const entropyBits = Math.round(effectiveLength * Math.log2(pool));

  let score: 1 | 2 | 3 | 4;

  if (password.length < 10 || (password.length < 16 && classes < 2)) {
    score = 1;
  } else if (password.length >= 14 && entropyBits >= 72) {
    score = 4;
  } else if (password.length >= 12 && entropyBits >= 56) {
    score = 3;
  } else {
    score = 2;
  }

  return { score, label: LABELS[score], isWeak: score <= 2, entropyBits };
}

export function generatePassphrase(
  wordCount = 4,
  includeExtras = true,
): string {
  const digits = "0123456789";
  const symbols = "!@#$%&*?";
  const extras = digits + symbols;

  const words = Array.from(
    { length: wordCount },
    () => EFF_WORDS[randomInt(EFF_WORDS.length)],
  );

  if (!includeExtras) return words.join("-");

  const suffixes = words.map(() => extras[randomInt(extras.length)]);

  if (wordCount >= 2) {
    const digitIdx = randomInt(wordCount);
    let symbolIdx = randomInt(wordCount);

    if (digitIdx === symbolIdx) symbolIdx = (digitIdx + 1) % wordCount;
    suffixes[digitIdx] = digits[randomInt(digits.length)];
    suffixes[symbolIdx] = symbols[randomInt(symbols.length)];
  }

  return words.map((word, i) => word + suffixes[i]).join("-");
}

export function generateRandomPassword(
  length = 20,
  includeSpecial = true,
): string {
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const special = "!@#$%^&*()-_=+";

  const pools = includeSpecial
    ? [lower, upper, digits, special]
    : [lower, upper, digits];
  const fullCharset = pools.join("");
  const safeLength = Math.max(pools.length, Math.floor(length));

  const chars = pools.map((pool) => pool[randomInt(pool.length)]);

  while (chars.length < safeLength) {
    chars.push(fullCharset[randomInt(fullCharset.length)]);
  }

  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join("");
}
