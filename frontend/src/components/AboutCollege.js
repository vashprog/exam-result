// AboutCollege.js
import React from 'react';
import aboutCollegeImage from '../components/images/college.jpeg';
import './AboutCollege.css'; // Import the CSS file

const AboutCollege = () => {
    return (
        <div className="main-page">
        <div className="about-college-container">
            <h2>About Our College</h2>
            <img src={aboutCollegeImage} alt="About College" className="about-college-image" />
            <div className="about-college-content">
                <p>A beacon of innovation and academic excellence offering various disciplines of engineering.</p>
            </div>
        </div>
        </div>
    );
};

export default AboutCollege;
