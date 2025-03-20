import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/solid"; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({
    title: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const foundTask = tasks.find((task) => task.id === parseInt(id));
    if (foundTask) {
      setTask(foundTask);
      setUpdatedTask({
        title: foundTask.title,
        description: foundTask.description,
        status: foundTask.status,
      });
    } else {
      navigate("/tasks");
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, ...updatedTask } : t
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTask({ ...task, ...updatedTask });
    setIsEditing(false);
    
    toast.success("Task updated successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = tasks.filter((t) => t.id !== task.id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      navigate("/tasks");
      
      toast.error("Task deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleComplete = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, status: "completed" } : t
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTask({ ...task, status: "completed" });

    toast.success("Task marked as complete!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100 p-8">
      <div
        onClick={() => navigate("/tasks")}
        className="cursor-pointer text-green-500 hover:text-green-300 transition duration-300 flex items-center gap-2 mb-6"
        aria-label="Back to tasks"
      >
        <ChevronLeftIcon className="w-6 h-6" />
        <span className="text-lg font-semibold">Back to Tasks</span>
      </div>

      <div className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-bold text-green-400 text-center mb-6">
          Task Details
        </h1>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          {isEditing ? (
            <>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-yellow-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={updatedTask.title}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 text-gray-100 rounded-lg focus:ring-2 focus:ring-green-500 transition"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-yellow-300 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={updatedTask.description}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 text-gray-100 rounded-lg focus:ring-2 focus:ring-green-500 transition"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-yellow-300 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={updatedTask.status}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 text-gray-100 rounded-lg focus:ring-2 focus:ring-green-500 transition"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="mt-6 flex gap-6 justify-center">
                <button
                  onClick={handleUpdate}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 shadow-lg"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition duration-300 shadow-lg"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-semibold text-green-300 mb-4">
                {task.title}
              </h2>
              <p className="text-gray-400 mb-6">{task.description}</p>
              <p className="text-sm text-gray-300 mb-6">Status: {task.status}</p>
              <div className="mt-6 flex gap-6 justify-center">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition duration-300 shadow-lg"
                >
                  Edit Task
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 shadow-lg"
                >
                  Delete Task
                </button>
                <button
                  onClick={handleComplete}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 shadow-lg"
                >
                  Mark as Complete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default TaskDetails;
