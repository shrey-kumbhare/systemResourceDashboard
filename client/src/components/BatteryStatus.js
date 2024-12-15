import React, { useEffect, useState } from "react";

const BatteryStatus = () => {
  const [batteryStatus, setBatteryStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBatteryStatus = async () => {
      setIsLoading(true);
      try {
        if ("getBattery" in navigator) {
          const battery = await navigator.getBattery();
          setBatteryStatus({
            battery_percent: Math.round(battery.level * 100),
            plugged: battery.charging,
          });

          // Add event listeners to update battery info dynamically
          battery.addEventListener("levelchange", () =>
            setBatteryStatus((prev) => ({
              ...prev,
              battery_percent: Math.round(battery.level * 100),
            }))
          );
          battery.addEventListener("chargingchange", () =>
            setBatteryStatus((prev) => ({
              ...prev,
              plugged: battery.charging,
            }))
          );
        } else {
          setError("Battery API is not supported in this browser.");
        }
      } catch (error) {
        console.error("Error fetching battery status:", error);
        setError("Failed to fetch battery status.");
      }
      setIsLoading(false);
    };

    fetchBatteryStatus();
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
