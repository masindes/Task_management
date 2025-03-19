import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Debounce function to delay search
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const TaskManager = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete Project Proposal",
      description: "Write and submit the project proposal by the end of the week.",
      status: "Pending",
    },
    {
      id: 2,
      title: "Prepare Presentation",
      description: "Create slides for the upcoming team meeting.",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Review Codebase",
      description: "Go through the codebase and identify areas for improvement.",
      status: "Completed",
    },
  ]);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "Pending",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filteredTasks, setFilteredTasks] = useState(tasks); 

  // Debounced search function
  const debouncedSearch = debounce((query) => {
    const filtered = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query.toLowerCase()) ||
        task.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, 300);

  // Update filtered tasks when search query changes
  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, tasks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddOrUpdateTask = (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.description) {
      toast.error("Please provide a title and description!");
      return;
    }

    if (isEditing) {
      const updatedTasks = tasks.map((task) =>
        task.id === editTaskId ? { ...task, ...newTask } : task
      );
      setTasks(updatedTasks);
      toast.success("Task updated successfully!");
      setIsEditing(false);
      setEditTaskId(null);
    } else {
      const newTaskWithId = { ...newTask, id: Date.now() };
      setTasks([...tasks, newTaskWithId]);
      toast.success("Task added successfully!");
    }

    setNewTask({
      title: "",
      description: "",
      status: "Pending",
    });
  };

  const handleEditTask = (task) => {
    setNewTask({
      title: task.title,
      description: task.description,
      status: task.status,
    });
    setIsEditing(true);
    setEditTaskId(task.id);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.info("Task deleted!");
  };

  const handleMarkCompleted = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: "Completed" } : task
      )
    );
    toast.success("Task marked as completed!");
  };

  // Group filtered tasks by status
  const groupedTasks = filteredTasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = [];
    }
    acc[task.status].push(task);
    return acc;
  }, {});

  const statusColumns = ["Pending", "In Progress", "Completed"];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-400 text-center mb-6">Task Manager</h1>

        {/* Add/Edit Form */}
        <form onSubmit={handleAddOrUpdateTask} className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              placeholder="Task Title"
              className="p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              required
            />
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              placeholder="Task Description"
              className="p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              required
            />
            <select
              name="status"
              value={newTask.status}
              onChange={handleInputChange}
              className="p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button
              type="submit"
              className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              {isEditing ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>

        {/* Search Bar */}
        <div className="mb-6 flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
            >
              Clear
            </button>
          )}
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statusColumns.map((status) => (
            <div key={status} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-blue-400 mb-4">{status}</h2>
              {groupedTasks[status]?.length > 0 ? (
                groupedTasks[status].map((task) => (
                  <div key={task.id} className="bg-gray-700 p-4 rounded-lg mb-4">
                    <h3 className="text-lg font-semibold text-white">{task.title}</h3>
                    <p className="text-sm text-gray-300 mt-2">{task.description}</p>
                    <div className="mt-4 flex gap-2">
                      {task.status !== "Completed" && (
                        <button
                          onClick={() => handleMarkCompleted(task.id)}
                          className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                        >
                          Complete
                        </button>
                      )}
                      <button
                        onClick={() => handleEditTask(task)}
                        className="px-3 py-1 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition duration-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center">No tasks in this column.</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;