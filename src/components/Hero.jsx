import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-green-800 text-white pt-32 pb-20"> {/* Increased top padding to pt-32 */}
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