import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import './MainPage.css';
import collegeDetailsImage from '../components/images/hat.jpg';
import resultImage from '../components/images/book_stack.jpg';

const MainPage = () => {
    const [enrollmentNumber, setEnrollmentNumber] = useState('');
    const navigate = useNavigate();

    const handleResultPageNavigation = () => {
        if (enrollmentNumber.trim() !== '') {
            navigate(`/result/${enrollmentNumber}`);
        } else {
            alert('Please enter a valid enrollment number.');
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
                imageUrl={collegeDetailsImage}
            >
                <button onClick={handleAboutCollegeNavigation} className="see-more-button">
                    See More
                </button>
            </Card>
            <Card
                title="Check Your Results"
                subtitle="Student Results"
                imageUrl={resultImage}
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
        </div>
    );
};

export default MainPage;
