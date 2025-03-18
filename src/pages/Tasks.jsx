// src/pages/Tasks.jsx
import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";

const Tasks = () => {
  const { tasks, addTask, updateTask, deleteTask } = useContext(TaskContext);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
  });
  const [editTaskId, setEditTaskId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (editTaskId) {
      updateTask(editTaskId, newTask);
      setEditTaskId(null);
    } else {
      addTask({ ...newTask, id: Date.now() });
    }
    setNewTask({ title: "", description: "", dueDate: "", status: "Pending" });
  };

  const handleEditTask = (task) => {
    setNewTask(task);
    setEditTaskId(task.id);
  };

  const handleDeleteTask = (id) => {
    deleteTask(id);
  };

  const handleMarkCompleted = (id) => {
    const task = tasks.find((task) => task.id === id);
    updateTask(id, { ...task, status: "Completed" });
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === "all") return true;
    return task.status === filterStatus;
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>

      {/* Add/Edit Task Form */}
      <form onSubmit={handleAddTask} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newTask.title}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newTask.description}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="date"
            name="dueDate"
            value={newTask.dueDate}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <select
            name="status"
            value={newTask.status}
            onChange={handleInputChange}
            className="p-2 border rounded"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          {editTaskId ? "Update Task" : "Add Task"}
        </button>
      </form>

      {/* Filter Tasks */}
      <div className="mb-4">
        <label className="mr-2">Filter by Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="p-4 border rounded shadow-sm bg-white"
          >
            <h3 className="text-xl font-bold">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
            <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
            <p className="text-sm text-gray-500">Status: {task.status}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleEditTask(task)}
                className="p-2 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="p-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
              {task.status !== "Completed" && (
                <button
                  onClick={() => handleMarkCompleted(task.id)}
                  className="p-2 bg-green-500 text-white rounded"
                >
                  Mark Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;