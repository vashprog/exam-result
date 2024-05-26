// src/components/Analytics.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Analytics() {
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    const fetchAnalytics = async () => {
      const response = await axios.get('http://localhost:5000/analytics');
      setAnalytics(response.data);
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl">
        <h2 className="text-center text-2xl font-bold mb-4">Analytics</h2>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <p className="text-center">Average Marks: {analytics.averageMarks}</p>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
