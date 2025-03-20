import React from "react";

const About = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Title Section */}
      <h1 className="text-5xl font-bold text-center text-gray-900 mb-8">
        About Task Manager
      </h1>

      
      <div className="text-center mb-12">
        <p className="text-xl text-gray-700 leading-relaxed">
          Welcome to <strong className="text-blue-600">Task Manager</strong>, your
          go-to application for managing tasks efficiently and staying organized.
          Whether you're working on personal projects or collaborating with a
          team, Task Manager helps you keep track of your tasks, deadlines, and
          progress.
        </p>
      </div>

      
      <div className="flex justify-center mb-12">
        <img
          src="src/assets/images/pngwing.com (14).png"
          alt="Task Manager Preview"
          className="rounded-lg shadow-xl w-full max-w-3xl transform hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Feature Card 1 */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Task Management
          </h3>
          <p className="text-gray-600">
            Create, update, and delete tasks with ease. Stay on top of your
            to-do list effortlessly.
          </p>
        </div>

        {/* Feature Card 2 */}
        <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Track Progress
          </h3>
          <p className="text-gray-600">
            Set due dates and track task status (Pending, In Progress,
            Completed) to monitor your progress.
          </p>
        </div>

        {/* Feature Card 3 */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Smart Filtering
          </h3>
          <p className="text-gray-600">
            Filter tasks based on their status and focus on what matters most.
          </p>
        </div>

        {/* Feature Card 4 */}
        <div className="bg-gradient-to-r from-pink-50 to-red-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Responsive Design
          </h3>
          <p className="text-gray-600">
            Access Task Manager seamlessly on any device, from desktops to
            smartphones.
          </p>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="text-center">
        <p className="text-xl text-gray-700 mb-6">
          Ready to get started? Join thousands of users who are already
          organizing their tasks with Task Manager!
        </p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default About;