import type { ReactNode } from "react";

export type NavRailItemProps = {
  icon: ReactNode;
  label: string;
  variant?: "nav" | "add" | "utility";
  isSelected?: boolean;
  hasAlert?: boolean;
  onClick: () => void;
};

function NavRailItem({
  icon,
  label,
  variant = "nav",
  isSelected = false,
  hasAlert = false,
  onClick,
}: NavRailItemProps) {
  const style =
    variant === "add"
      ? "size-7 border border-border-hairline bg-surface-elevated text-ink-secondary shadow-sm hover:border-accent hover:bg-accent-wash hover:text-accent"
      : variant === "utility"
        ? "size-8 text-ink-muted hover:bg-surface-subtle hover:text-ink-primary"
        : isSelected
          ? "size-8 text-accent hover:bg-surface-subtle"
          : "size-8 text-ink-secondary hover:bg-surface-subtle hover:text-ink-primary";

  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      aria-current={isSelected ? "page" : undefined}
      className={`relative flex items-center justify-center transition-colors rounded-sharp shrink-0 ${style}`}
    >
      <span aria-hidden="true">{icon}</span>
      {hasAlert && (
        <span
          aria-hidden="true"
          className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-signal-warning"
        />
      )}
    </button>
  );
}

export default NavRailItem;
