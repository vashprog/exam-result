// src/components/Results.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/results', {
        headers: { Authorization: token }
      });
      setResults(response.data);
    };
    fetchResults();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl">
        <h2 className="text-center text-2xl font-bold mb-4">Your Results</h2>
        <ul className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {results.map((result, index) => (
            <li key={index} className="flex justify-between border-b py-2">
              <span>{result.subject}</span>
              <span>{result.mark}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Results;
