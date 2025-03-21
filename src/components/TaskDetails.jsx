import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMarkingCompleted, setIsMarkingCompleted] = useState(false);

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
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not logged in");
        navigate("/login");
        return;
      }

      await axios.delete(
        `https://task-managent-backend.onrender.com/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.info("Task deleted!");
      navigate("/tasks");
    } catch (error) {
      toast.error("Failed to delete task");
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleMarkCompleted = async () => {
    setIsMarkingCompleted(true);
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
      fetchTaskDetails();
    } catch (error) {
      toast.error("Failed to mark task as completed");
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsMarkingCompleted(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-[#d0e8c8]">Loading...</div>;
  }

  if (!task) {
    return <div className="flex justify-center items-center min-h-screen bg-[#d0e8c8]">Task not found!</div>;
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
        <h1 className="text-4xl font-bold text-[#4a6b3d] mb-6">{task.title}</h1>
        <p className="text-lg text-[#4a6b3d] mb-6">{task.description}</p>
        <p className="text-sm text-[#4a6b3d] mb-4">Due: {task.due_date}</p>
        <p className="text-sm text-[#4a6b3d] mb-6">Status: {task.status}</p>

        <div className="flex gap-4">
          {task.status !== "Completed" && (
            <button
              onClick={handleMarkCompleted}
              disabled={isMarkingCompleted}
              className="p-3 bg-[#4a6b3d] text-white rounded-lg hover:bg-[#6b8e23] transition duration-300"
            >
              {isMarkingCompleted ? 'Marking...' : 'Mark as Completed'}
            </button>
          )}

          <button
            onClick={() => navigate(`/task/${task.id}/edit`)}
            className="p-3 bg-[#f9d342] text-[#4a6b3d] rounded-lg hover:bg-[#d0e8c8] transition duration-300"
          >
            Edit Task
          </button>
          
          <button
            onClick={handleDeleteTask}
            className="p-3 bg-[#d35400] text-white rounded-lg hover:bg-[#e67e22] transition duration-300"
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;