import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { formatShortcut } from "../utils/vaultHelpers";

function TitleBar() {
  return (
    <header
      data-tauri-drag-region
      className="col-span-full relative flex  items-center justify-center bg-surface-chrome"
    >
      <button
        type="button"
        className="h-7 flex items-center justify-between gap-2 px-2.5 w-100 rounded-sharp bg-surface-elevated border border-border-hairline text-label text-ink-muted 
        shadow-sm transition-colors hover:border-ink-muted/30 hover:text-ink-secondary"
      >
        <span className="flex items-center gap-2">
          <MagnifyingGlassIcon size={13} className="shrink-0" />
          <span>Search or run command...</span>
        </span>
        <kbd className="kbd">{formatShortcut("K")}</kbd>
      </button>
    </header>
  );
}

export default TitleBar;
