/**
 * This code was generated by Builder.io.
 */
import React, { useState, useEffect } from "react";

const AnomalyDetection = () => {
  const [anomalies, setAnomalies] = useState([]);

  useEffect(() => {
    fetchAnomalies();
    const interval = setInterval(fetchAnomalies, 60000); // Fetch every minute
    return () => clearInterval(interval);
  }, []);

  const fetchAnomalies = async () => {
    try {
      const response = await fetch("/api/anomalies");
      const data = await response.json();
      setAnomalies(data);
    } catch (error) {
      console.error("Error fetching anomalies:", error);
    }
  };

  const getAnomalyColor = (severity) => {
    switch (severity) {
      case "Low":
        return "bg-yellow-200 text-yellow-800";
      case "Medium":
        return "bg-orange-200 text-orange-800";
      case "High":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Anomaly Detection</h2>
      {anomalies.length > 0 ? (
        <ul className="space-y-4">
          {anomalies.map((anomaly) => (
            <li key={anomaly.id} className="border-l-4 border-red-500 pl-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{anomaly.title}</h3>
                <span
                  className={`px-2 py-1 rounded ${getAnomalyColor(
                    anomaly.severity
                  )}`}
                >
                  {anomaly.severity}
                </span>
              </div>
              <p className="text-gray-600">{anomaly.description}</p>
              <div className="mt-2">
                <span className="text-sm text-gray-500">
                  Detected at: {new Date(anomaly.timestamp).toLocaleString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No anomalies detected.</p>
      )}
    </div>
  );
};

export default AnomalyDetection;
