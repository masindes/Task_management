// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Feature Overview */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-4">Easy Task Management</h3>
            <p className="text-gray-600">
              Create, update, and delete tasks with just a few clicks. Stay
              organized and focused on what matters most.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-4">Track Progress</h3>
            <p className="text-gray-600">
              Monitor your tasks with status updates (Pending, In Progress,
              Completed) and never lose track of your goals.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-4">Filter and Search</h3>
            <p className="text-gray-600">
              Quickly find tasks by status or search for specific titles and
              descriptions.
            </p>
          </div>
        </div>
      </div>

      
        <div className="container mx-auto px-4 sm:px-6  text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8">
            Join thousands of users who are already managing their tasks
            efficiently with Task Manager.
          </p>
          <Link
            to="/tasks"
            className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-500 transition duration-300"
          >
            Start Managing Tasks
          </Link>
    
      </div>
    </div>
  );
};

export default Home;