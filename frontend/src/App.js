import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Result from './components/Result';
import MainPage from './components/MainPage';
import AboutCollege from './components/AboutCollege';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <nav className="bg-gray-800 text-white">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="text-lg font-bold">College Exam Results</div>
            <div>
              <Link to="/" className="px-3 py-2 hover:bg-gray-700 rounded">Home</Link>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<MainPage />} />     
          <Route path="/about-college" element={<AboutCollege />} />
          <Route path="/result/:enrollmentNumber" element={<Result />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
