import React, { useEffect, useState } from "react";
import axios from "axios";

const Time = () => {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/time");
        setTime(response.data.current_time);
      } catch (error) {
        console.error("Error fetching time:", error);
      }
    };
    fetchTime();
  }, []);

  return (
    <div>
      <h2>Current Time</h2>
      {time ? <p>{time}</p> : <p>Loading...</p>}
    </div>
  );
};

export default Time;
