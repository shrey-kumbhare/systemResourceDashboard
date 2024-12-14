import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [time, setTime] = useState(null);
  const [pythonVersion, setPythonVersion] = useState(null);
  const [batteryStatus, setBatteryStatus] = useState(null);
  const [cpuRamUsage, setCpuRamUsage] = useState(null);
  const [cpuTemp, setCpuTemp] = useState(null);
  const [gpuUsage, setGpuUsage] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all the data from the backend
        const timeResponse = await axios.get("http://127.0.0.1:8000/time");
        setTime(timeResponse.data.current_time);

        const pythonVersionResponse = await axios.get(
          "http://127.0.0.1:8000/python-version"
        );
        setPythonVersion(pythonVersionResponse.data.python_version);

        const batteryStatusResponse = await axios.get(
          "http://127.0.0.1:8000/battery-status"
        );
        setBatteryStatus(batteryStatusResponse.data);

        const cpuRamUsageResponse = await axios.get(
          "http://127.0.0.1:8000/cpu-ram-usage"
        );
        setCpuRamUsage(cpuRamUsageResponse.data);

        const cpuTempResponse = await axios.get(
          "http://127.0.0.1:8000/cpu-temp"
        );
        setCpuTemp(cpuTempResponse.data.cpu_temp);

        const gpuUsageResponse = await axios.get(
          "http://127.0.0.1:8000/gpu-usage"
        );
        setGpuUsage(gpuUsageResponse.data);

        const locationResponse = await axios.get(
          "http://127.0.0.1:8000/location"
        );
        setLocation(locationResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>System Resource Dashboard</h1>
      <div>
        <h2>Current Time</h2>
        {time ? <p>{time}</p> : <p>Loading...</p>}
      </div>
      <div>
        <h2>Python Version</h2>
        {pythonVersion ? <p>{pythonVersion}</p> : <p>Loading...</p>}
      </div>
      <div>
        <h2>Battery Status</h2>
        {batteryStatus ? (
          <p>
            Battery: {batteryStatus.battery_percent}% | Plugged:{" "}
            {batteryStatus.plugged ? "Yes" : "No"}
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div>
        <h2>CPU & RAM Usage</h2>
        {cpuRamUsage ? (
          <p>
            CPU: {cpuRamUsage.cpu_percent}% | RAM: {cpuRamUsage.ram_usage}%
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div>
        <h2>CPU Temperature</h2>
        {cpuTemp !== null ? <p>{cpuTemp}°C</p> : <p>Loading...</p>}
      </div>
      <div>
        <h2>GPU Usage</h2>
        {gpuUsage ? (
          gpuUsage.map((gpu, index) => (
            <p key={index}>
              {gpu.gpu}: {gpu.load}% Usage
            </p>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div>
        <h2>Location</h2>
        {location ? (
          <p>
            {location.city}, {location.region}, {location.country}
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default App;
