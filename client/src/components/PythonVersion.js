import React, { useEffect, useState } from "react";
import axios from "axios";

const PythonVersion = () => {
  const [pythonVersion, setPythonVersion] = useState(null);

  useEffect(() => {
    const fetchPythonVersion = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/python-version"
        );
        setPythonVersion(response.data.python_version);
      } catch (error) {
        console.error("Error fetching Python version:", error);
      }
    };
    fetchPythonVersion();
  }, []);

  return (
    <div>
      <h2>Python Version</h2>
      {pythonVersion ? <p>{pythonVersion}</p> : <p>Loading...</p>}
    </div>
  );
};

export default PythonVersion;
