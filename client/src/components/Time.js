import React, { useEffect, useState } from "react";
import axios from "axios";

const Time = () => {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await axios.get(
          "https://systemresourcedashboard.onrender.com/time"
        );
        setTime(response.data.current_time);
      } catch (error) {
        console.error("Error fetching time:", error);
      }
    };
    fetchTime();
    const intervalId = setInterval(fetchTime, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="content">
      <h2>Current Time</h2>
      {time ? (
        <p>
          Date: {new Date(time).toLocaleDateString()} <br />
          Time: {new Date(time).toLocaleTimeString()}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Time;
