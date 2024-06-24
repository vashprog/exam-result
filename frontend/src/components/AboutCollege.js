import React from 'react';
import aboutCollegeImage from '../components/images/College1.jpg';
import './AboutCollege.css'; 

const AboutCollege = () => {
    return (
        <div className="main-page">
        <div className="about-college-container">
            <h1>About Our College</h1>
            <img src={aboutCollegeImage} alt="About College" className="about-college-image" />
            <div className="about-college-content">
                <pre>Welcome to our engineering college, where innovation meets excellence.</pre>
            </div>
        </div>
        </div>
    );
};

export default AboutCollege;