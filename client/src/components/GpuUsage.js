import React, { useEffect, useState } from "react";
import axios from "axios";

const GpuUsage = () => {
  const [gpuUsage, setGpuUsage] = useState(null);

  useEffect(() => {
    const fetchGpuUsage = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/gpu-usage");
        setGpuUsage(response.data);
      } catch (error) {
        console.error("Error fetching GPU usage:", error);
      }
    };
    fetchGpuUsage();
  }, []);

  return (
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
  );
};

export default GpuUsage;
