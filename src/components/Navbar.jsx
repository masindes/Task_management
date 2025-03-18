
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-gray-800 shadow-lg z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo or Brand Name */}
          <Link
            to="/"
            className="text-white text-3xl font-bold hover:text-red-500 transition duration-300" 
          >
            Task Manager
          </Link>

          {/*  Menu for Mobile */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-red-500 focus:outline-none"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              to="/"
              className="text-white hover:text-red-500 px-4 py-3 rounded-md text-lg font-medium transition duration-300" // Increased text size to text-lg and padding
            >
              Home
            </Link>
            <Link
              to="/tasks"
              className="text-white hover:text-red-500 px-4 py-3 rounded-md text-lg font-medium transition duration-300"
            >
              Tasks
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-red-500 px-4 py-3 rounded-md text-lg font-medium transition duration-300"
            >
              About
            </Link>
          </div>
        </div>

        {/* Navigation Links (Mobile) */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-4 space-y-2 sm:px-3">
              <Link
                to="/"
                className="block text-white hover:text-red-500 px-4 py-3 rounded-md text-lg font-medium transition duration-300" // Increased text size to text-lg and padding
              >
                Home
              </Link>
              <Link
                to="/tasks"
                className="block text-white hover:text-red-500 px-4 py-3 rounded-md text-lg font-medium transition duration-300"
              >
                Tasks
              </Link>
              <Link
                to="/about"
                className="block text-white hover:text-red-500 px-4 py-3 rounded-md text-lg font-medium transition duration-300"
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;