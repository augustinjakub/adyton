import {
  PlusIcon,
  SquaresFourIcon,
  StarIcon,
  ShieldCheckIcon,
  TrashIcon,
  CloudIcon,
  LockIcon,
  GearIcon,
} from "@phosphor-icons/react";

function NavRail() {
  return (
    <div className="flex pt-8 pb-5 bg-surface-base border-x border-b border-border-hairline">
      <nav className="flex w-full flex-col  items-center">
        <div className="flex flex-col gap-6 items-center">
          <PlusIcon
            size={20}
            weight="regular"
            className="text-ink-secondary shrink-0"
          />
          <span className="h-px w-8 rounded-tile bg-border-hairline"></span>
          <SquaresFourIcon
            size={22}
            weight="regular"
            className="text-ink-secondary shrink-0"
          />
          <StarIcon
            size={22}
            weight="regular"
            className="text-ink-secondary shrink-0"
          />
          <ShieldCheckIcon
            size={22}
            weight="regular"
            className="text-ink-secondary shrink-0"
          />
          <TrashIcon
            size={22}
            weight="regular"
            className="text-ink-secondary shrink-0"
          />
        </div>
        <div className="mt-auto flex flex-col gap-6">
          <CloudIcon
            size={22}
            weight="regular"
            className="text-ink-secondary shrink-0"
          />
          <LockIcon
            size={22}
            weight="regular"
            className="text-ink-secondary shrink-0"
          />
          <GearIcon
            size={22}
            weight="regular"
            className="text-ink-secondary shrink-0"
          />
        </div>
      </nav>
    </div>
  );
}

export default NavRail;
