import React from "react";
import Time from "./components/Time";
import PythonVersion from "./components/PythonVersion";
import BatteryStatus from "./components/BatteryStatus";
import CpuRamUsage from "./components/CpuRamUsage.js";
import GpuUsage from "./components/GpuUsage";
import Location from "./components/Location";
import "./App.css";

const App = () => {
  return (
    <div>
      <h1>System Resource Dashboard</h1>
      <Time />
      <PythonVersion />
      <BatteryStatus />
      <CpuRamUsage />
      <GpuUsage />
      {/* <Location /> */}
    </div>
  );
};

export default App;
