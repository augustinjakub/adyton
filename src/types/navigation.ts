export type ActiveView = "all" | "favorites" | "audit" | "trash";
export type ActiveModal = "command-palette" | "settings" | null;

export type ThemePreferences = "system" | "light" | "dark";

export type VaultSelection =
  | { mode: "none" }
  | { mode: "item"; id: string }
  | { mode: "create"; previousId: string | null };

export type VaultSortBy = "title" | "updated";
