import { Route, Routes } from "react-router-dom";
import ActiveVehicleList from "./features/ActiveVehicleList";
import LastInfo from "./features/LastInfo";
import LogCount from "./features/LogCount";

function App() {
  return (
    <div className="flex h-screen">
      <div className="m-auto w-[90%]">
        <Routes>
          <Route path="/" element={<ActiveVehicleList />} />
          <Route path="lastinfo/:id" element={<LastInfo />} />
          <Route path="logcount/:id" element={<LogCount />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
