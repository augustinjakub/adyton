import { MagnifyingGlassIcon } from "@phosphor-icons/react";

function TitleBar() {
  return (
    <header
      data-tauri-drag-region
      className="col-span-full grid grid-cols-[1fr_auto_1fr] items-center bg-surface-base border border-border-hairline"
    >
      <div data-tauri-drag-region className="min-w-21 h-full"></div>
      <button
        type="button"
        className="h-8 flex items-center gap-2 px-2.5 w-110 rounded-tile bg-surface-elevated border border-border-hairline"
      >
        <MagnifyingGlassIcon
          size={16}
          className="text-ink-secondary shrink-0"
        />
        <span className="text-ink-secondary text-ui">
          Search vault or run command...
        </span>
        <span className="ml-auto font-mono tracking-widest rounded-tile px-1.5 py-0.5 text-micro text-ink-secondary bg-surface-selected">
          ⌘K
        </span>
      </button>
      <div data-tauri-drag-region className="min-w-21 h-full"></div>
    </header>
  );
}

export default TitleBar;
