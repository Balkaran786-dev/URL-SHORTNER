import React from 'react';
import { Link } from '@tanstack/react-router';

const Navbar = () => {
  return (
    <nav className="bg-gray-300 border-b border-gray-300 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-center">
          <Link
            to="/"
            className="text-2xl font-extrabold text-gray-800 tracking-widest uppercase w-full text-center"
          >
            URL SHORTENER
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
