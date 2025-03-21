import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const TaskEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    due_date: "",
    status: "Pending",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTaskDetails();
  }, [id]);

  const fetchTaskDetails = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not logged in");
        navigate("/login");
        return;
      }

      const response = await axios.get(
        `https://task-managent-backend.onrender.com/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTask(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch task details");
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not logged in");
        navigate("/login");
        return;
      }

      await axios.put(
        `https://task-managent-backend.onrender.com/tasks/${id}`,
        task,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Task updated successfully!");
      navigate(`/task/${id}`);
    } catch (error) {
      toast.error("Failed to update task");
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#d0e8c8] p-6">
      <ToastContainer position="top-right" autoClose={2000} />
      
      <div className="mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-[#4a6b3d] hover:text-[#6b8e23] transition duration-300"
        >
          <AiOutlineArrowLeft className="mr-2 text-xl" />
          Back
        </button>
      </div>
      
      <div className="max-w-6xl mx-auto bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] p-8 rounded-xl shadow-2xl border border-[#a5d6a7]">
        <h1 className="text-4xl font-bold text-[#4a6b3d] mb-6">Edit Task</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg text-[#4a6b3d]" htmlFor="title">
              Task Title
            </label>
            <input
              type="text"
              id="title"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              className="w-full p-3 border border-[#a5d6a7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a6b3d] bg-white text-[#4a6b3d]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg text-[#4a6b3d]" htmlFor="description">
              Task Description
            </label>
            <textarea
              id="description"
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              className="w-full p-3 border border-[#a5d6a7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a6b3d] bg-white text-[#4a6b3d]"
              rows="4"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-lg text-[#4a6b3d]" htmlFor="due_date">
              Due Date
            </label>
            <input
              type="date"
              id="due_date"
              value={task.due_date}
              onChange={(e) => setTask({ ...task, due_date: e.target.value })}
              className="w-full p-3 border border-[#a5d6a7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a6b3d] bg-white text-[#4a6b3d]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg text-[#4a6b3d]" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              value={task.status}
              onChange={(e) => setTask({ ...task, status: e.target.value })}
              className="w-full p-3 border border-[#a5d6a7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a6b3d] bg-white text-[#4a6b3d]"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="p-3 bg-[#4a6b3d] text-white rounded-lg hover:bg-[#6b8e23] transition duration-300"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate(`/task/${id}`)}
              className="p-3 bg-[#f9d342] text-[#4a6b3d] rounded-lg hover:bg-[#d0e8c8] transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskEdit;