import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskManager = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete Project Proposal",
      description: "Write and submit the project proposal by the end of the week.",
      status: "Pending",
      dateCreated: "2023-10-01",
    },
    {
      id: 2,
      title: "Prepare Presentation",
      description: "Create slides for the upcoming team meeting.",
      status: "In Progress",
      dateCreated: "2023-10-02",
    },
    {
      id: 3,
      title: "Review Codebase",
      description: "Go through the codebase and identify areas for improvement.",
      status: "Completed",
      dateCreated: "2023-10-03",
    },
  ]);
  const [newTask, setNewTask] = useState({ title: "", description: "", status: "Pending", dateCreated: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [filter, setFilter] = useState("All");

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  // Add or Update Task
  const handleAddOrUpdateTask = (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.description) {
      toast.error("Please provide a title and description!");
      return;
    }

    if (isEditing) {
      setTasks(tasks.map((task) => (task.id === editTaskId ? { ...task, ...newTask } : task)));
      toast.success("Task updated successfully!");
      setIsEditing(false);
      setEditTaskId(null);
    } else {
      const taskWithDate = { ...newTask, id: Date.now(), dateCreated: new Date().toISOString().split("T")[0] };
      setTasks([...tasks, taskWithDate]);
      toast.success("Task added successfully!");
    }

    setNewTask({ title: "", description: "", status: "Pending", dateCreated: "" });
  };

  // Edit Task
  const handleEditTask = (task) => {
    setNewTask({ title: task.title, description: task.description, status: task.status, dateCreated: task.dateCreated });
    setIsEditing(true);
    setEditTaskId(task.id);
  };

  // Delete Task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.info("Task deleted!");
  };

  // Mark Task as Completed
  const handleMarkCompleted = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status: "Completed" } : task)));
    toast.success("Task marked as completed!");
  };

  // Filter Tasks
  const filteredTasks = tasks.filter((task) => filter === "All" || task.status === filter);

  // Statistics
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;
  const completedTasks = tasks.filter((task) => task.status === "Completed").length;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-md p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-blue-600">Task Manager</h1>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Tasks</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <ToastContainer position="top-right" autoClose={2000} />

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">Total Tasks</h3>
            <p className="text-3xl font-bold text-blue-600">{totalTasks}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">Pending Tasks</h3>
            <p className="text-3xl font-bold text-yellow-600">{pendingTasks}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">Completed Tasks</h3>
            <p className="text-3xl font-bold text-green-600">{completedTasks}</p>
          </div>
        </div>

        {/* Add/Edit Form */}
        <form onSubmit={handleAddOrUpdateTask} className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              placeholder="Task Title"
              className="col-span-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              placeholder="Task Description"
              className="col-span-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="status"
              value={newTask.status}
              onChange={handleInputChange}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button
              type="submit"
              className="col-span-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              {isEditing ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>

        {/* Task List */}
        {filteredTasks.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Title</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Description</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Date Created</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="border-t hover:bg-gray-50 transition duration-300">
                    <td className="p-3 text-sm text-gray-800">{task.title}</td>
                    <td className="p-3 text-sm text-gray-600">{task.description}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 text-sm font-semibold rounded-full ${
                          task.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : task.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-600">{task.dateCreated}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        {task.status !== "Completed" && (
                          <button
                            onClick={() => handleMarkCompleted(task.id)}
                            className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                          >
                            Complete
                          </button>
                        )}
                        <button
                          onClick={() => handleEditTask(task)}
                          className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center text-lg">No tasks available. Add a new task!</p>
        )}
      </div>
    </div>
  );
};

export default TaskManager; 