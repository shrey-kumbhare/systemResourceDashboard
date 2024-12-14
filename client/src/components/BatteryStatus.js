import React, { useEffect, useState } from "react";
import axios from "axios";

const BatteryStatus = () => {
  const [batteryStatus, setBatteryStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBatteryStatus = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://systemresourcedashboard-1.onrender.com/battery-status"
        );
        setBatteryStatus(response.data);
      } catch (error) {
        console.error("Error fetching battery status:", error);
        setError("Failed to fetch battery status.");
      }
      setIsLoading(false);
    };

    fetchBatteryStatus();
    const intervalId = setInterval(fetchBatteryStatus, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="content">
      <h2>Battery Status</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>
          Battery: {batteryStatus.battery_percent}% | Plugged:{" "}
          {batteryStatus.plugged ? "Yes" : "No"}
        </p>
      )}
    </div>
  );
};

export default BatteryStatus;
