import React, { useEffect, useState } from "react";

const Location = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              // Use a reverse geocoding API to get location details
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
              );
              const data = await response.json();
              setLocation({
                city: data.address.city || data.address.town || "Unknown",
                region: data.address.state || "Unknown",
                country: data.address.country || "Unknown",
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              });
            } catch (err) {
              console.error("Error fetching location details:", err);
              setError("Failed to fetch location details.");
            }
          },
          (err) => {
            console.error("Error getting geolocation:", err);
            setError("Failed to fetch geolocation.");
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    fetchLocation();
  }, []);

  return (
    <div className="content">
      <h2>Location</h2>
      {error ? (
        <p>{error}</p>
      ) : location ? (
        <>
          <p>
            {location.city}, {location.region}, {location.country}
          </p>
          <p>Timezone: {location.timezone}</p>
        </>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
};

export default Location;
