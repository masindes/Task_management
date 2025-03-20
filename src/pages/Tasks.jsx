import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const TaskManager = () => {
  const navigate = useNavigate();

  
  const initialTasks = JSON.parse(localStorage.getItem("tasks")) || [
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
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "Pending",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    toast.info("Task deleted!");
  };

  const handleMarkCompleted = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: "Completed" } : task
    );
    setTasks(updatedTasks);
    toast.success("Task marked as completed!");
  };

 
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const groupedTasks = filteredTasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = [];
    }
    acc[task.status].push(task);
    return acc;
  }, {});

  const statusColumns = ["Pending", "In Progress", "Completed"];

  return (
    <div className="min-h-screen bg-green-50 text-gray-800 p-4">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 text-center mb-6">
          Farm Task Manager
        </h1>

        
        <form
          onSubmit={handleAddOrUpdateTask}
          className="bg-white p-6 rounded-lg shadow-md mb-8 border border-green-100"
        >
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              placeholder="Task Title"
              className="p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-800"
              required
            />
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              placeholder="Task Description"
              className="p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-800"
              required
            />
            <select
              name="status"
              value={newTask.status}
              onChange={handleInputChange}
              className="p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-800"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button
              type="submit"
              className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
            >
              {isEditing ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>

        
        <div className="mb-6 flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-800"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition duration-300"
            >
              Clear
            </button>
          )}
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statusColumns.map((status) => (
            <div
              key={status}
              className="bg-white p-4 rounded-lg shadow-md border border-green-100"
            >
              <h2 className="text-xl font-semibold text-green-800 mb-4">{status}</h2>
              {groupedTasks[status]?.length > 0 ? (
                groupedTasks[status].map((task) => (
                  <div
                    key={task.id}
                    onClick={() => navigate(`/task/${task.id}`)}
                    className="bg-green-50 p-4 rounded-lg mb-4 cursor-pointer hover:bg-green-100 transition duration-300"
                  >
                    <h3 className="text-lg font-semibold text-green-900">{task.title}</h3>
                    <p className="text-sm text-green-700 mt-2">{task.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-green-600 text-center">No tasks in this column.</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
