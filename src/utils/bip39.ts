import bip39WordlistRaw from "../assets/bip39-english.txt?raw";
import { randomInt } from "./randomInt";

const BIP39_WORDS: readonly string[] = bip39WordlistRaw.trim().split(/\s+/);

const BIP39_WORD_SET: ReadonlySet<string> = new Set(BIP39_WORDS);

if (BIP39_WORDS.length !== 2048) {
  throw new Error(
    `Expected 2048 BIP-39 words got only ${BIP39_WORDS.length} file may have been modified`,
  );
}

// TODO: Rust real BIP-39 (entropy + checksum) via bip39 crate
export function generateRecoveryWords(wordCount = 24): string {
  const words = Array.from(
    { length: wordCount },
    () => BIP39_WORDS[randomInt(BIP39_WORDS.length)],
  );

  return words.join("-");
}

export function isBip39Word(word: string): boolean {
  return BIP39_WORD_SET.has(word.trim().toLowerCase());
}

export function normalizeRecoverySecret(secret: string): string {
  return secret
    .trim()
    .toLowerCase()
    .split(/[\s-]+/)
    .filter(Boolean)
    .join("-");
}
