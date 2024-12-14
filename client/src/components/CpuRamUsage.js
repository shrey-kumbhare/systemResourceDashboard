import React, { useEffect, useState } from "react";
import axios from "axios";

const CpuRamUsage = () => {
  const [cpuRamUsage, setCpuRamUsage] = useState(null);

  useEffect(() => {
    const fetchCpuRamUsage = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/cpu-ram-usage");
        setCpuRamUsage(response.data);
      } catch (error) {
        console.error("Error fetching CPU & RAM usage:", error);
      }
    };
    fetchCpuRamUsage();
  }, []);

  return (
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
  );
};

export default CpuRamUsage;
