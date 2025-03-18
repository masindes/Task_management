
import React from "react";

const About = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">About Task Manager</h1>
      <p className="text-lg mb-4">
        Welcome to <strong>Task Manager</strong>, your go-to application for
        managing tasks efficiently and staying organized. Whether you're working
        on personal projects or collaborating with a team, Task Manager helps you
        keep track of your tasks, deadlines, and progress.
      </p>

      <h2 className="text-2xl font-bold mb-2">Features</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Create, update, and delete tasks with ease.</li>
        <li>Set due dates and track task status (Pending, In Progress, Completed).</li>
        <li>Filter tasks based on their status.</li>
        <li>Mark tasks as completed once done.</li>
        <li>Responsive design for seamless use on any device.</li>
      </ul>

      <h2 className="text-2xl font-bold mb-2">Why Choose Task Manager?</h2>
      <p className="text-lg mb-4">
        Task Manager is designed to simplify your workflow and help you focus on
        what matters most. With an intuitive interface and powerful features,
        you'll never miss a deadline or forget an important task again.
      </p>

      <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
      <p className="text-lg mb-4">
        Have questions or feedback? We'd love to hear from you! Reach out to us
        at <a href="mailto:support@taskmanager.com" className="text-blue-500 hover:underline">support@taskmanager.com</a>.
      </p>
    </div>
  );
};

export default About;