import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Result from './components/Result';
import MainPage from './components/MainPage';
import AboutCollege from './components/AboutCollege';
import DepartmentDetails from './components/DepartmentDetails';

import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <nav className="bg-black text-white">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="text-lg font-bold">College Exam Results</div>
            <div className="flex items-center">
              <div className="relative">
                <button className="px-3 py-2 hover:bg-gray-700 rounded">Explore Departments</button>
                <div className="absolute bg-gray-800 dropdown-menu">
                  <Link to="/department/CSE" className="block px-4 py-2 hover:bg-gray-700">View CSE Department Details</Link>
                  <Link to="/department/ECE" className="block px-4 py-2 hover:bg-gray-700">View ECE Department Details</Link>
                  <Link to="/department/EEE" className="block px-4 py-2 hover:bg-gray-700">View EEE Department Details</Link>
                  <Link to="/department/ME" className="block px-4 py-2 hover:bg-gray-700">View ME Department Details</Link>
                  <Link to="/department/CE" className="block px-4 py-2 hover:bg-gray-700">View CE Department Details</Link>
                </div>
              </div>
              <Link to="/" className="px-3 py-2 hover:bg-gray-700 rounded ml-4">Home</Link>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about-college" element={<AboutCollege />} />
          <Route path="/result/:enrollmentNumber" element={<Result />} />
          <Route path="/department/:departmentName" element={<DepartmentDetails />} />
        </Routes>
      </div>
      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto py-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">About Us</h3>
              <p>Welcome to our engineering college, where innovation meets excellence.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul>
                <li><Link to="/" className="text-white hover:text-gray-300">Home</Link></li>
                <li><Link to="/about-college" className="text-white hover:text-gray-300">About College</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p>NIT Manipur, Langol</p>
              <p>Email: nitmanipur@gmail.com</p>
              <p>Phone: +1234567890</p>
            </div>
            
          </div>
        </div>
      </footer>
    </Router>
  );
}

export default App;