import TitleBar from "./components/TitleBar";
import NavRail from "./components/NavRail";
import VaultList from "./components/VaultList";
import ItemInspector from "./components/ItemInspector";

function App() {
  return (
    <div className="h-full grid grid-rows-[50px_1fr] grid-cols-[60px_260px_1fr] ">
      <TitleBar />
      <NavRail />
      <VaultList />
      <ItemInspector />
    </div>
  );
}

export default App;
