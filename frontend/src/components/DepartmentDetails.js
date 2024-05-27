import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DepartmentDetails = () => {
  const { departmentName } = useParams();
  const [departmentStats, setDepartmentStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartmentStats = async () => {
      try {
        const [averageResponse, toppersResponse] = await Promise.all([
          fetch(`/api/averageMarks/${departmentName}`),
          fetch(`/api/toppers/${departmentName}`)
        ]);

        const averageData = await averageResponse.json();
        const toppersData = await toppersResponse.json();

        setDepartmentStats({
          averageMarks: averageData.averageMarks,
          topToppers: toppersData.topToppers
        });
      } catch (error) {
        console.error('Error fetching department stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartmentStats();
  }, [departmentName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!departmentStats) {
    return <div>No data available</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">{departmentName} Department Statistics</h2>
      <div className="bg-white p-4 rounded shadow-md mb-4">
        <h3 className="text-lg font-semibold">Average Marks: {departmentStats.averageMarks.toFixed(2)}</h3>
      </div>
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-lg font-semibold mb-2">Top 10 Toppers</h3>
        <ul>
          {departmentStats.topToppers.map((topper, index) => (
            <li key={index} className="mb-2">
              <strong>{topper.student.name}</strong> - {topper.totalMarks} marks
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DepartmentDetails;
