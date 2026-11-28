import { openUrl } from "@tauri-apps/plugin-opener";
import type { ActiveView, VaultSortBy } from "../types/navigation";
import type { VaultItemSummary } from "../types/vault";

export type VaultFilterMode = "all" | "favorites" | "weak" | "reused";

export const isMac =
  typeof navigator !== "undefined" &&
  /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);

export function formatShortcut(key: string, shift = false) {
  return isMac
    ? `⌘${shift ? "⇧" : ""}${key}`
    : `Ctrl+${shift ? "Shift+" : ""}${key}`;
}

export function filterItemsForView(
  items: VaultItemSummary[],
  view: ActiveView,
): VaultItemSummary[] {
  return items.filter((item) => {
    if (view === "trash") return item.deletedAt !== null;
    if (item.deletedAt !== null) return false;
    if (view === "favorites") return item.isFavorite;
    if (view === "audit") return item.isReused || item.isWeak;
    return true;
  });
}

export function sortItemsForView(
  items: VaultItemSummary[],
  view: ActiveView,
  sortAsc = true,
  sortBy: VaultSortBy = "title",
): VaultItemSummary[] {
  return [...items].sort((a, b) => {
    if (view === "trash") return (b.deletedAt ?? 0) - (a.deletedAt ?? 0);
    if (sortBy === "title") {
      const diff = a.title.localeCompare(b.title);
      return sortAsc ? diff : -diff;
    } else {
      return sortAsc ? b.updatedAt - a.updatedAt : a.updatedAt - b.updatedAt;
    }
  });
}

export async function openSafeWebsite(rawUrl: string): Promise<void> {
  const trimmed = rawUrl.trim();
  if (!trimmed) return;

  try {
    const url = new URL(
      trimmed.includes("://") ? trimmed : `https://${trimmed}`,
    );
    if (url.protocol !== "http:" && url.protocol !== "https:") return;
    await openUrl(url.toString()).catch(() =>
      window.open(url.toString(), "_blank", "noopener,noreferrer"),
    );
  } catch {
    //* ignore bad form urls
  }
}
