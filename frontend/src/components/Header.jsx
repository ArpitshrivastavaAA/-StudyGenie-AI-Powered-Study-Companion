import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          🧠 StudyGenie
        </Link>
        <nav>
          <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2">Dashboard</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;