import React, { useEffect, useState } from "react";
import axios from "axios";

const GpuUsage = () => {
  const [gpuUsage, setGpuUsage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGpuUsage = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://systemresourcedashboard.onrender.com/gpu-usage"
        );
        setGpuUsage(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching GPU usage:", error);
        setError("Failed to fetch GPU usage.");
        setIsLoading(false);
      }
    };

    fetchGpuUsage();
    const intervalId = setInterval(fetchGpuUsage, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="content">
      <h2>GPU Usage</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        gpuUsage.map((gpu, index) => (
          <p key={index}>
            {gpu.gpu}: {gpu.load}% Usage
          </p>
        ))
      )}
    </div>
  );
};

export default GpuUsage;
