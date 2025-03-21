import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const TaskManager = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    due_date: "",
    status: "Pending",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    title: "",
    description: "",
    due_date: "",
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
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleValidation = () => {
    const errors = {};
    if (!newTask.title) {
      errors.title = "Title is required!";
    }
    if (!newTask.description) {
      errors.description = "Description is required!";
    }
    if (!newTask.due_date) {
      errors.due_date = "Due Date is required!";
    } else {
      const isValidDate = Date.parse(newTask.due_date);
      if (isNaN(isValidDate)) {
        errors.due_date = "Invalid due date format. Use ISO format (YYYY-MM-DD).";
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddOrUpdateTask = async (e) => {
    e.preventDefault();
    if (!handleValidation()) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not logged in");
        navigate("/login");
        return;
      }

      setLoading(true);
      const url = isEditing
        ? `https://task-managent-backend.onrender.com/tasks/${editTaskId}`
        : "https://task-managent-backend.onrender.com/tasks";

      const method = isEditing ? "put" : "post";

      await axios[method](url, newTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(isEditing ? "Task updated successfully!" : "Task added successfully!");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to save task");
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setNewTask({
        title: "",
        description: "",
        due_date: "",
        status: "Pending",
      });
      setIsEditing(false);
      setEditTaskId(null);
      setLoading(false);
      setFormErrors({});
    }
  };

  const handleEditTask = (task) => {
    setNewTask({
      title: task.title,
      description: task.description,
      due_date: task.due_date,
      status: task.status,
    });
    setIsEditing(true);
    setEditTaskId(task.id);
  };

  const handleDeleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not logged in");
        navigate("/login");
        return;
      }

      await axios.delete(`https://task-managent-backend.onrender.com/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.info("Task deleted!");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to delete task");
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  const handleMarkCompleted = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not logged in");
        navigate("/login");
        return;
      }

      await axios.put(
        `https://task-managent-backend.onrender.com/tasks/${id}`,
        { status: "Completed" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Task marked as completed!");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to mark task as completed");
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

  const groupedTasks = filteredTasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = [];
    }
    acc[task.status].push(task);
    return acc;
  }, {});

  const statusColumns = ["Pending", "In Progress", "Completed"];

  return (
    <div className="min-h-screen bg-[#81c784] text-[#2e7d32] p-4">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#388e3c] text-center mb-6">Task Manager</h1>

        <form
          onSubmit={handleAddOrUpdateTask}
          className="bg-white p-6 rounded-lg shadow-md mb-8 border border-[#4caf50]"
        >
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              placeholder="Task Title"
              className="p-3 border border-[#4caf50] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#388e3c] bg-white text-[#388e3c]"
              required
            />
            {formErrors.title && (
              <div className="text-red-600 text-sm mt-1">{formErrors.title}</div>
            )}
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              placeholder="Task Description"
              className="p-3 border border-[#4caf50] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#388e3c] bg-white text-[#388e3c]"
              required
            />
            {formErrors.description && (
              <div className="text-red-600 text-sm mt-1">{formErrors.description}</div>
            )}
            <input
              type="date"
              name="due_date"
              value={newTask.due_date}
              onChange={handleInputChange}
              className="p-3 border border-[#4caf50] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#388e3c] bg-white text-[#388e3c]"
              required
            />
            {formErrors.due_date && (
              <div className="text-red-600 text-sm mt-1">{formErrors.due_date}</div>
            )}
            <select
              name="status"
              value={newTask.status}
              onChange={handleInputChange}
              className="p-3 border border-[#4caf50] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#388e3c] bg-white text-[#388e3c]"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button
              type="submit"
              className="p-3 bg-[#388e3c] text-white rounded-lg hover:bg-[#2e7d32] transition duration-300"
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
            className="w-full p-3 border border-[#4caf50] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#388e3c] bg-white text-[#388e3c]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-3 bg-[#66bb6a] text-white rounded-lg hover:bg-[#4caf50] transition duration-300"
            >
              Clear
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statusColumns.map((status) => (
            <div key={status} className="bg-white p-4 rounded-lg shadow-md border border-[#4caf50]">
              <h2 className="text-xl font-semibold text-[#388e3c]">{status} Tasks</h2>
              <ul className="mt-4">
                {groupedTasks[status]?.map((task) => (
                  <li key={task.id} className="border-b border-[#4caf50] pb-4 mb-4">
                    <h3 className="text-lg font-semibold text-[#388e3c]">{task.title}</h3>
                    <p className="text-sm text-[#388e3c]">{task.description}</p>
                    <div className="mt-2 flex gap-2">
                      {task.status !== "Completed" && (
                        <button
                          onClick={() => handleMarkCompleted(task.id)}
                          className="p-2 bg-[#66bb6a] text-white rounded-lg hover:bg-[#4caf50] transition duration-300"
                        >
                          Mark as Completed
                        </button>
                      )}
                      <button
                        onClick={() => handleEditTask(task)}
                        className="p-2 bg-[#66bb6a] text-white rounded-lg hover:bg-[#4caf50] transition duration-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-2 bg-[#c62828] text-white rounded-lg hover:bg-[#b71c1c] transition duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
