import React, { useEffect, useState } from "react";
import axios from "axios";

const BatteryStatus = () => {
  const [batteryStatus, setBatteryStatus] = useState(null);

  useEffect(() => {
    const fetchBatteryStatus = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/battery-status"
        );
        setBatteryStatus(response.data);
      } catch (error) {
        console.error("Error fetching battery status:", error);
      }
    };
    fetchBatteryStatus();
  }, []);

  return (
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
  );
};

export default BatteryStatus;
