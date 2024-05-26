// src/components/CheckEnrollment.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CheckEnrollment() {
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const navigate = useNavigate();

  const handleCheck = () => {
    navigate(`/result/${enrollmentNumber}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Check Enrollment</h1>
      <input
        type="text"
        value={enrollmentNumber}
        onChange={(e) => setEnrollmentNumber(e.target.value)}
        placeholder="Enter Enrollment Number"
        className="border p-2 mb-4"
      />
      <button onClick={handleCheck} className="bg-blue-500 text-white px-4 py-2 rounded">
        Check Result
      </button>
    </div>
  );
}

export default CheckEnrollment;
