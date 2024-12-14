import React, { useEffect, useState } from "react";
import axios from "axios";

const PythonVersion = () => {
  const [pythonVersion, setPythonVersion] = useState(null);

  useEffect(() => {
    const fetchPythonVersion = async () => {
      try {
        const response = await axios.get(
          "https://systemresourcedashboard.onrender.com/python-version"
        );
        setPythonVersion(response.data.python_version);
      } catch (error) {
        console.error("Error fetching Python version:", error);
      }
    };
    fetchPythonVersion();
    const intervalId = setInterval(fetchPythonVersion, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="content">
      <h2>Python Version</h2>
      {pythonVersion ? <p>{pythonVersion}</p> : <p>Loading...</p>}
    </div>
  );
};

export default PythonVersion;
