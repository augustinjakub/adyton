export const isMac =
  typeof navigator !== "undefined" &&
  /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);

export function formatShortcut(key: string, shift = false) {
  return isMac
    ? `⌘${shift ? "⇧" : ""}${key}`
    : `Ctrl+${shift ? "Shift+" : ""}${key}`;
}
