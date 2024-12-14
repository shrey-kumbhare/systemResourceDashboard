import React, { useEffect, useState } from "react";
import axios from "axios";

const Location = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/location");
        setLocation(response.data);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };
    fetchLocation();
  }, []);

  return (
    <div className="content">
      <h2>Location</h2>
      {location ? (
        <p>
          {location.city}, {location.region}, {location.country}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Location;
