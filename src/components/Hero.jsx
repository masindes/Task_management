// src/components/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
          Manage Your Tasks Effortlessly
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl mb-8">
          Organize, track, and complete your tasks with ease. Stay productive and
          never miss a deadline again.
        </p>
        <Link
          to="/tasks"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Hero;