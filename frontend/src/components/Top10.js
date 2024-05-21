// src/components/Top10.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Top10() {
  const [top10, setTop10] = useState([]);

  useEffect(() => {
    const fetchTop10 = async () => {
      const response = await axios.get('http://localhost:5000/top10');
      setTop10(response.data);
    };
    fetchTop10();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl">
        <h2 className="text-center text-2xl font-bold mb-4">Top 10 Students</h2>
        <ul className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {top10.map((student, index) => (
            <li key={index} className="flex justify-between border-b py-2">
              <span>{student.username}</span>
              <span>{student.results.reduce((sum, result) => sum + result.mark, 0)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Top10;
