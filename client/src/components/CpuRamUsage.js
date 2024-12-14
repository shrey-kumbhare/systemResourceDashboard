import React, { useEffect, useState } from "react";
import axios from "axios";

const CpuRamUsage = () => {
  const [cpuRamUsage, setCpuRamUsage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCpuRamUsage = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://127.0.0.1:8000/cpu-ram-usage");
        setCpuRamUsage(response.data);
      } catch (error) {
        console.error("Error fetching CPU & RAM usage:", error);
        setError("Failed to fetch data.");
      }
      setIsLoading(false);
    };
    fetchCpuRamUsage();

    const intervalId = setInterval(fetchCpuRamUsage, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="content">
      <h2>CPU & RAM Usage</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>
          CPU: {cpuRamUsage.cpu_percent}% | RAM: {cpuRamUsage.ram_usage}%
        </p>
      )}
    </div>
  );
};

export default CpuRamUsage;
