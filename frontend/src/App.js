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
        <nav className="bg-gray-800 text-white">
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
    </Router>
  );
}

export default App;
