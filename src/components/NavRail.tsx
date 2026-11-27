import {
  ArrowsClockwiseIcon,
  CardsThreeIcon,
  GearSixIcon,
  LockSimpleIcon,
  PlusIcon,
  ShieldCheckIcon,
  StarIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import type { ActiveView } from "../types/navigation";
import { formatShortcut } from "../utils/vaultHelpers";
import NavRailItem from "./NavRailItem";

const NAV_TABS: {
  id: ActiveView;
  label: string;
  Icon: typeof CardsThreeIcon;
}[] = [
  { id: "all", label: "All Items", Icon: CardsThreeIcon },
  { id: "favorites", label: "Favorites", Icon: StarIcon },
  { id: "audit", label: "Security Audit", Icon: ShieldCheckIcon },
  { id: "trash", label: "Trash", Icon: TrashIcon },
];

function NavRail() {
  return (
    <nav className="flex flex-col h-full items-center justify-between bg-surface-chrome py-3">
      <div className="flex flex-col items-center gap-2">
        <NavRailItem
          variant="add"
          icon={<PlusIcon size={15} weight="regular" />}
          label={`New Item (${formatShortcut("N")})`}
          onClick={() => {}}
        />
        <div className="mt-1 h-px w-4 bg-border-hairline" />
        {NAV_TABS.map(({ id, label, Icon }) => {
          return (
            <NavRailItem
              key={id}
              icon={<Icon size={22} weight="light" />}
              label={label}
              onClick={() => {}}
            />
          );
        })}
      </div>
      <div className="flex flex-col items-center gap-2">
        <NavRailItem
          variant="utility"
          icon={<ArrowsClockwiseIcon size={22} weight="light" />}
          label="Sync Vault"
          onClick={() => {}}
        />
        <NavRailItem
          variant="utility"
          icon={<LockSimpleIcon size={22} weight="light" />}
          label={`Lock Vault (${formatShortcut("L")})`}
          onClick={() => {}}
        />
        <NavRailItem
          variant="utility"
          icon={<GearSixIcon size={22} weight="light" />}
          label={`Settings (${formatShortcut(",")})`}
          onClick={() => {}}
        />
      </div>
    </nav>
  );
}

export default NavRail;
