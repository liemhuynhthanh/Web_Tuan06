import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Correctly import Routes, Route, Link
import UseReducer from './pages/UseReducer.jsx';
import TodoApp from './pages/TodoApp.jsx';
export default function App() {
  return (
    <Router>
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-purple-600 to-blue-500 p-4 shadow-lg">
        <ul className="flex justify-center gap-8 text-white font-semibold text-lg">
          <li>
            <Link
              to="/bai1"
              className="hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-110"
            >
              Bai 1
            </Link>
          </li>
          <li>
            <Link
              to="/bai2"
              className="hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-110"
            >
              Bai 2
            </Link>
          </li>
        </ul>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/bai1" element={<UseReducer />} />
        <Route path="/bai2" element={<TodoApp />} />
      </Routes>
    </Router>
  );
}
