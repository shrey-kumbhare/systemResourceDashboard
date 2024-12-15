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
          "https://systemresourcedashboard-1.onrender.com/gpu-usage"
        );
        setGpuUsage(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching GPU usage:", error);
        setError(
          "Failed to fetch GPU usage. Ensure the backend is running and accessible."
        );
      }
      setIsLoading(false);
    };

    fetchGpuUsage();
    const intervalId = setInterval(fetchGpuUsage, 5000); // Update every 5 seconds
    return () => clearInterval(intervalId); // Cleanup
  }, []);

  return (
    <div className="content">
      <h2>GPU Usage</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : gpuUsage && gpuUsage.length > 0 ? (
        gpuUsage.map((gpu, index) => (
          <p key={index}>
            {gpu.gpu}: {gpu.load.toFixed(2)}% Usage
          </p>
        ))
      ) : (
        <p>No GPU usage data available.</p>
      )}
    </div>
  );
};

export default GpuUsage;
