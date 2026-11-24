import TitleBar from "./components/TitleBar";
import NavRail from "./components/NavRail";
import VaultList from "./components/VaultList";
import ItemInspector from "./components/ItemInspector";

import { useState } from "react";
import type { ActiveView, ActiveModal } from "./types/navigation";

function App() {
  const [activeView, setActiveView] = useState<ActiveView>("all");
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  return (
    <div className="h-full grid grid-rows-[50px_1fr] grid-cols-[60px_260px_1fr] ">
      <TitleBar />
      <NavRail
        activeView={activeView}
        onSelectView={setActiveView}
        onOpenModal={setActiveModal}
      />
      <VaultList />
      <ItemInspector />
    </div>
  );
}

export default App;
