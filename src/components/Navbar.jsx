import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/t_logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-green-900 shadow-md z-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Task Manager Logo" className="h-10 w-auto" />
            <h1 className="text-white hover:text-green-500 text-2xl font-semibold">Task Manager</h1>
          </Link>

          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-green-500 focus:outline-none transition duration-300"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          
          <div className="hidden md:flex items-center space-x-6">
            {["Home", "Tasks", "About"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="text-white hover:text-green-500 px-5 py-3 rounded-lg text-lg font-medium transition ease-in-out duration-300"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-gray-800 shadow-lg">
            <div className="flex flex-col items-center py-4 space-y-3">
              {["Home", "Tasks", "About"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="block text-white hover:text-green-500 px-6 py-3 rounded-md text-lg font-medium transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;