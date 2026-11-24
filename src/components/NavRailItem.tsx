import type { ReactNode } from "react";

export type NavRailItemProps = {
  icon: ReactNode;
  variant?: "nav" | "add";
  label: string;
  isSelected?: boolean;
  hasAlert?: null | "warning" | "info";
  onClick: () => void;
};

function NavRailItem({
  icon,
  label,
  onClick,
  variant = "nav",
  isSelected = false,
  hasAlert = null,
}: NavRailItemProps) {
  const baseClasses =
    "relative flex size-9 items-center justify-center rounded-tile transition-colors";

  let stateClasses = "";
  if (variant === "add") {
    stateClasses =
      "bg-surface-elevated border border-border-hairline text-ink-secondary hover:bg-surface-selected hover:text-ink-primary";
  } else if (isSelected) {
    stateClasses = "bg-accent-wash text-accent";
  } else {
    stateClasses =
      "text-ink-secondary hover:bg-surface-subtle hover:text-ink-primary";
  }

  const dotColorClass =
    hasAlert === "info" ? "bg-signal-info" : "bg-signal-warning";

  return (
    <button
      className={`${baseClasses} ${stateClasses}`}
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
    >
      {isSelected && (
        <span
          aria-hidden="true"
          className="absolute -left-3 top-1/2 h-8 w-0.75 -translate-y-1/2 rounded-r-l bg-accent"
        />
      )}

      <span aria-hidden="true">{icon}</span>

      {hasAlert && (
        <span
          aria-hidden="true"
          className={`absolute top-2 right-1.5 size-2 rounded-full ${dotColorClass}`}
        />
      )}
    </button>
  );
}

export default NavRailItem;
