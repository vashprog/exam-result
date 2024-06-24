import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DepartmentDetails.css';

const departmentBackgrounds = {
  CSE: require('../components/images/cse.jpeg'),
  ECE: require('../components/images/ece.jpeg'),
  EEE: require('../components/images/eee.jpg'),
  ME: require('../components/images/me.jpg'),
  CE: require('../components/images/ce.jpg')
};

const DepartmentDetails = () => {
  const { departmentName } = useParams();
  const [departmentStats, setDepartmentStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartmentStats = async () => {
      try {
        const [averageResponse, toppersResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/averageMarks/${departmentName}`),
          axios.get(`${process.env.REACT_APP_API_URL}/toppers/${departmentName}`)
        ]);

        setDepartmentStats({
          averageMarks: averageResponse.data.averageMarks,
          topToppers: toppersResponse.data.topToppers
        });
      } catch (error) {
        console.error('Error fetching department stats:', error);
        setError('Failed to load department statistics. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDepartmentStats();
  }, [departmentName]);

  
  const backgroundImage = departmentBackgrounds[departmentName] || require('../components/images/default.jpeg').default;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!departmentStats) {
    return <div>No data available</div>;
  }

  return (
    <div className="department-details" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="overlay">
        <h2 className="title">{departmentName} Department Statistics</h2>
        <div className="stats-card">
          <h3 className="subtitle">Average Marks: {departmentStats.averageMarks.toFixed(2)}</h3>
        </div>
        <div className="toppers-card">
          <h3 className="subtitle">Top 3 students</h3>
          <ul>
            {departmentStats.topToppers.map((topper, index) => (
              <li key={index}>
                <strong>{topper.student.name}</strong> - {topper.totalMarks} marks
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetails;
