import {
  PlusIcon,
  SquaresFourIcon,
  StarIcon,
  TrashIcon,
  CloudIcon,
  LockIcon,
  GearIcon,
  ShieldIcon,
} from "@phosphor-icons/react";
import type { ActiveView, ActiveModal } from "../types/navigation";
import NavRailItem from "./NavRailItem";

type NavRailProps = {
  activeView: ActiveView;
  onSelectView: (view: ActiveView) => void;
  onOpenModal: (view: ActiveModal) => void;
};

function NavRail({ activeView, onSelectView, onOpenModal }: NavRailProps) {
  return (
    <div
      data-tauri-drag-region
      className="flex pt-4 pb-5 bg-surface-base border-x border-b border-border-hairline"
    >
      <nav
        data-tauri-drag-region
        className="flex w-full flex-col  items-center"
      >
        <div
          data-tauri-drag-region
          className="flex flex-col gap-3.5 items-center"
        >
          <NavRailItem
            icon={<PlusIcon size={15} weight="bold" />}
            label="Add Item"
            variant="add"
            onClick={() => onOpenModal("add-item")}
          />

          <span className="h-px w-8 rounded-tile bg-border-hairline"></span>
          <NavRailItem
            icon={<SquaresFourIcon size={22} weight="bold" />}
            label="All Items"
            isSelected={activeView === "all"}
            hasAlert={null}
            onClick={() => onSelectView("all")}
          />

          <NavRailItem
            icon={<StarIcon size={22} weight="bold" />}
            label="Favorites"
            isSelected={activeView === "favorites"}
            hasAlert={null}
            onClick={() => onSelectView("favorites")}
          />

          <NavRailItem
            icon={<ShieldIcon size={22} weight="bold" />}
            label="Security Audit"
            isSelected={activeView === "audit"}
            hasAlert={"warning"}
            onClick={() => onSelectView("audit")}
          />

          <NavRailItem
            icon={<TrashIcon size={22} weight="bold" />}
            label="Recently deleted"
            isSelected={activeView === "trash"}
            hasAlert={null}
            onClick={() => onSelectView("trash")}
          />
        </div>
        <div data-tauri-drag-region className="mt-auto flex flex-col gap-3.5">
          <NavRailItem
            icon={<CloudIcon size={22} weight="bold" />}
            label="Cloud Sync"
            hasAlert={"info"}
            onClick={() => {}}
          />

          <NavRailItem
            icon={<LockIcon size={22} weight="bold" />}
            label="Lock App"
            hasAlert={null}
            onClick={() => {}}
          />

          <NavRailItem
            icon={<GearIcon size={22} weight="bold" />}
            label="Settings"
            hasAlert={null}
            onClick={() => onOpenModal("settings")}
          />
        </div>
      </nav>
    </div>
  );
}

export default NavRail;
