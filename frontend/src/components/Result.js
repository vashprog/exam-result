import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
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

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Result Marksheet', 14, 22);
    doc.setFontSize(12);
    if (result) {
      doc.text(`Student Name: ${result.studentName}`, 14, 30);
      doc.text(`Enrollment Number: ${enrollmentNumber}`, 14, 38);
      doc.text(`Total Marks: ${result.totalMarks}`, 14, 46);
      doc.text(`Percentage: ${result.percentage}%`, 14, 54);

      const tableColumn = ['Course', 'Marks'];
      const tableRows = [];

      result.exams.forEach(exam => {
        const examData = [
          exam.course,
          exam.marks
        ];
        tableRows.push(examData);
      });

      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 60
      });

      doc.save(`Result_Marksheet_${enrollmentNumber}.pdf`);
    } else {
      doc.text('No result found for this enrollment number.', 14, 30);
      doc.save(`Result_Not_Found_${enrollmentNumber}.pdf`);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="main-page">
      <div className="container-result mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">Result</h1>
        {result ? (
          <div>
            <p>Student Name: {result.studentName}</p>
            <p>Enrollment No: {enrollmentNumber}</p>
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
        <button onClick={downloadPDF} className="download-button">
          Download Marksheet
        </button>
      </div>
    </div>
  );
}

export default Result;
