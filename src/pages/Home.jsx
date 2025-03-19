import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col justify-center items-center p-8">
     
      <div className="w-full max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-8 text-green-900">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         
          <div className="bg-green-100 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-bold mb-4 text-green-900">
              🌱 Easy Task Management
            </h3>
            <p className="text-green-700">
              Create, update, and delete tasks with just a few clicks. Stay
              organized and focused on what matters most.
            </p>
          </div>

          
          <div className="bg-green-100 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-bold mb-4 text-green-900">
              📊 Track Progress
            </h3>
            <p className="text-green-700">
              Monitor your tasks with status updates (Pending, In Progress,
              Completed) and never lose track of your goals.
            </p>
          </div>

         
          <div className="bg-green-100 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-bold mb-4 text-green-900">
              🔍 Filter and Search
            </h3>
            <p className="text-green-700">
              Quickly find tasks by status or search for specific titles and
              descriptions.
            </p>
          </div>
        </div>
      </div>

      
      <div className="w-full max-w-6xl mt-12 text-center">
        <h2 className="text-4xl font-bold mb-6 text-green-900">
          Ready to Get Started?
        </h2>
        <p className="text-xl mb-8 text-green-700">
          Join thousands of users who are already managing their tasks
          efficiently with Task Manager.
        </p>
        
        <Link
          to="/tasks"
          className="bg-green-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition duration-300 text-lg"
        >
          Start Managing Tasks
        </Link>
      </div>
    </div>
  );
};

export default Home;