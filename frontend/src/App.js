// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Results from './components/Results';
import Top10 from './components/Top10';
import Analytics from './components/Analytics';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <nav className="bg-gray-800 text-white">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="text-lg font-bold">College Exam Results</div>
            <div>
              <Link to="/" className="px-3 py-2 hover:bg-gray-700 rounded">Home</Link>
              <Link to="/login" className="px-3 py-2 hover:bg-gray-700 rounded">Login</Link>
              <Link to="/register" className="px-3 py-2 hover:bg-gray-700 rounded">Register</Link>
              <Link to="/results" className="px-3 py-2 hover:bg-gray-700 rounded">Results</Link>
              <Link to="/top10" className="px-3 py-2 hover:bg-gray-700 rounded">Top10</Link>
              <Link to="/analytics" className="px-3 py-2 hover:bg-gray-700 rounded">Analytics</Link>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={
            <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/college.jpeg')" }}>
              <div className="bg-white bg-opacity-75 p-8 rounded shadow-md text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to College Exam Results Portal</h1>
                <p className="text-lg">Check your results, find the top students, and view detailed analytics.</p>
              </div>
            </div>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/results" element={<Results />} />
          <Route path="/top10" element={<Top10 />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
