import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

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
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not logged in");
        navigate("/login");
        return;
      }

      const response = await axios.get(`https://task-managent-backend.onrender.com/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.data) {
        setTask(response.data.data);
        setUpdatedTask({
          title: response.data.data.title,
          description: response.data.data.description,
          status: response.data.data.status,
        });
      } else {
        toast.error("Task not found");
        navigate("/tasks");
      }
    } catch (error) {
      toast.error("Failed to fetch task details");
      console.error("Error fetching task details:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not logged in");
        navigate("/login");
        return;
      }

      await axios.put(
        `https://task-managent-backend.onrender.com/tasks/${id}`,
        updatedTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Task updated successfully!");
      setTask({ ...task, ...updatedTask });
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update task");
      console.error("Error updating task:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
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

        toast.error("Task deleted successfully!");
        navigate("/tasks");
      } catch (error) {
        toast.error("Failed to delete task");
        console.error("Error deleting task:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    }
  };

  const handleComplete = async () => {
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
      setTask({ ...task, status: "Completed" });
    } catch (error) {
      toast.error("Failed to mark task as completed");
      console.error("Error marking task as completed:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-green-50 p-4">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate("/tasks")}
            className="text-green-600 hover:text-green-800 flex items-center"
          >
            <ChevronLeftIcon className="w-6 h-6 mr-2" />
            Back to Tasks
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-green-100">
          {isEditing ? (
            <div>
              <input
                type="text"
                name="title"
                value={updatedTask.title}
                onChange={handleChange}
                className="p-3 border border-green-200 rounded-lg mb-4 w-full"
              />
              <textarea
                name="description"
                value={updatedTask.description}
                onChange={handleChange}
                className="p-3 border border-green-200 rounded-lg mb-4 w-full"
              />
              <select
                name="status"
                value={updatedTask.status}
                onChange={handleChange}
                className="p-3 border border-green-200 rounded-lg mb-4 w-full"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <button
                onClick={handleUpdate}
                className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-semibold text-green-800 mb-4">{task.title}</h1>
              <p className="text-sm text-green-700">{task.description}</p>
              <p className="text-sm text-green-600 mt-2">Status: {task.status}</p>
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                >
                  Edit Task
                </button>
                <button
                  onClick={handleDelete}
                  className="p-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete Task
                </button>
                {task.status !== "Completed" && (
                  <button
                    onClick={handleComplete}
                    className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Mark as Completed
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
