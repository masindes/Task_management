import React from "react";

const About = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      {/* Title Section */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        About Task Manager
      </h1>

      {/* Introduction Section */}
      <div className="text-center mb-8">
        <p className="text-lg text-gray-600 leading-relaxed">
          Welcome to <strong className="text-blue-600">Task Manager</strong>,
          your go-to application for managing tasks efficiently and staying
          organized. Whether you're working on personal projects or collaborating
          with a team, Task Manager helps you keep track of your tasks,
          deadlines, and progress.
        </p>
      </div>

      {/* Image Section */}
      <div className="flex justify-center mb-8">
        <img
          src="src/assets/images/pngwing.com (14).png"
          alt="Task Manager Preview"
          className="rounded-lg shadow-lg w-full max-w-2xl"
        />
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Features</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Create, update, and delete tasks with ease.</li>
          <li>Set due dates and track task status (Pending, In Progress, Completed).</li>
          <li>Filter tasks based on their status.</li>
          <li>Mark tasks as completed once done.</li>
          <li>Responsive design for seamless use on any device.</li>
        </ul>
      </div>
    </div>
  );
};

export default About;