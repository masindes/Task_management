import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const TaskManager = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    due_date: "",
    status: "Pending",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not logged in");
        navigate("/login");
        return;
      }

      const response = await axios.get("https://task-managent-backend.onrender.com/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data.data)) {
        setTasks(response.data.data);
      } else {
        toast.error("Failed to load tasks");
      }
    } catch (error) {
      toast.error("Failed to fetch tasks");
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        toast.error("Network error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not logged in");
        navigate("/login");
        return;
      }

      const response = await axios.post(
        "https://task-managent-backend.onrender.com/tasks",
        newTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNewTask({ title: "", description: "", due_date: "", status: "Pending" });
      fetchTasks();
      toast.success("Task added successfully!");
    } catch (error) {
      toast.error("Failed to add task");
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f0f4e3] p-6">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#4a6b3d] text-center mb-8">Task Manager</h1>

        <div className="mb-8 bg-[#e8f5e9] p-6 rounded-xl shadow-lg border border-[#c8e6c9]">
          <h2 className="text-2xl font-semibold text-[#4a6b3d] mb-4">Add New Task</h2>
          <form onSubmit={handleAddTask}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm text-[#4a6b3d] mb-2">
                Task Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-[#a5d6a7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a6b3d] bg-white text-[#4a6b3d]"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm text-[#4a6b3d] mb-2">
                Task Description
              </label>
              <textarea
                id="description"
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-[#a5d6a7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a6b3d] bg-white text-[#4a6b3d]"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="due_date" className="block text-sm text-[#4a6b3d] mb-2">
                Due Date
              </label>
              <input
                type="date"
                id="due_date"
                name="due_date"
                value={newTask.due_date}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-[#a5d6a7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a6b3d] bg-white text-[#4a6b3d]"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="status" className="block text-sm text-[#4a6b3d] mb-2">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={newTask.status}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-[#a5d6a7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a6b3d] bg-white text-[#4a6b3d]"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-[#4a6b3d] text-white rounded-lg hover:bg-[#3a5530] transition duration-300"
            >
              Add Task
            </button>
          </form>
        </div>

        <div className="mb-6 flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="w-full p-3 border border-[#a5d6a7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a6b3d] bg-white text-[#4a6b3d]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-3 bg-[#a5d6a7] text-[#4a6b3d] rounded-lg hover:bg-[#81c784] transition duration-300"
            >
              Clear
            </button>
          )}
        </div>

        {loading ? (
          <div className="text-center text-[#4a6b3d]">Loading tasks...</div>
        ) : (
          <>
            {filteredTasks.length === 0 ? (
              <div className="text-center text-[#4a6b3d]">No tasks available</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-[#e8f5e9] p-6 rounded-xl shadow-lg border border-[#c8e6c9] cursor-pointer hover:shadow-2xl transition duration-300"
                    onClick={() => navigate(`/task/${task.id}`)}
                  >
                    <h3 className="text-lg font-semibold text-[#4a6b3d]">{task.title}</h3>
                    <p className="text-sm text-[#4a6b3d]">{task.description.slice(0, 100)}...</p>
                    <p className="text-sm text-[#4a6b3d] mt-2">Due: {task.due_date}</p>
                    <p className="text-sm text-[#4a6b3d] mt-2">Status: {task.status}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TaskManager;