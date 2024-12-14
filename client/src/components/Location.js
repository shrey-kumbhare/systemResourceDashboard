import React, { useEffect, useState } from "react";
import axios from "axios";

const Location = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/location");
        setLocation(response.data);
      } catch (error) {
        console.error("Error fetching location:", error);
        setError("Failed to fetch location.");
      }
    };

    fetchLocation();
    const intervalId = setInterval(fetchLocation, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="content">
      <h2>Location</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <p>
            {location.city}, {location.region}, {location.country}
          </p>
          <p>Timezone: {location.timezone}</p>
        </>
      )}
    </div>
  );
};

export default Location;
