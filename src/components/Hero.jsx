// src/components/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-sky-500 to-green-500 text-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
          Manage Your Tasks Effortlessly
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl mb-8">
          Organize, track, and complete your tasks with ease. Stay productive and
          never miss a deadline again.
        </p>
      </div>
    </div>
  );
};

export default Hero;