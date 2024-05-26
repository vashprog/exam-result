import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Result.css';


function Result() {
  const { enrollmentNumber } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/marks/${enrollmentNumber}`)
      .then(response => {
        setResult(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching result:', error);
        setLoading(false);
      });
  }, [enrollmentNumber]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="main-page">
    <div className="container-result mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Result for {enrollmentNumber}</h1>
      {result ? (
        <div>
          <p>Total Marks: {result.totalMarks}</p>
          <p>Percentage: {result.percentage}%</p>
          <h1 className="text-xl font-bold mb-4">Exams:</h1>
          <ul>
            {result.exams.map((exam, index) => (
              <li key={index}>
                {exam.course}: {exam.marks} marks
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No result found for this enrollment number.</p>
      )}
    </div>
    </div>
  );
}

export default Result;
