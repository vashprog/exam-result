import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import './MainPage.css';
import collegeDetailsImage from '../components/images/college.jpeg';
import resultImage from '../components/images/result.jpeg';

const MainPage = () => {
    const [enrollmentNumber, setEnrollmentNumber] = useState('');
    const navigate = useNavigate();

    const handleDepartmentNavigation = (departmentName) => {
        navigate(`/department/${departmentName}`);
    };

    const handleResultPageNavigation = () => {
        if (enrollmentNumber.trim() !== '') {
            navigate(`/result/${enrollmentNumber}`);
        }
    };

    const handleAboutCollegeNavigation = () => {
        navigate('/about-college');
    };

    return (
        <div className="main-page">
            <Card
                title="Learn More About Our College"
                subtitle="College Details"
                content="Discover more about our college, faculty, and the courses we offer."
                imageUrl={collegeDetailsImage}
            >
                <button onClick={handleAboutCollegeNavigation} className="see-more-button">
                    See More
                </button>
            </Card>
            <Card
                title="Check Your Results"
                subtitle="Student Results"
                content=""
                imageUrl={resultImage}
                onClick={handleResultPageNavigation}
            >
                <div className="enrollment-input-container">
                    <input
                        type="text"
                        placeholder="Enter Enrollment Number"
                        value={enrollmentNumber}
                        onChange={(e) => setEnrollmentNumber(e.target.value)}
                        className="enrollment-input"
                    />
                    <button onClick={handleResultPageNavigation} className="enrollment-button">
                        Go to Results
                    </button>
                </div>
            </Card>
            <Card title="Explore Departments">
                {['CSE', 'ECE', 'EEE', 'ME', 'CE'].map((department) => (
                    <button
                        key={department}
                        onClick={() => handleDepartmentNavigation(department)}
                        className="department-button"
                    >
                        View {department} Department Details
                    </button>
                ))}
            </Card>
        </div>
    );
};

export default MainPage;
