import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import { AuthProvider } from "./context/AuthContext"; 
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Home from "./pages/Home";
import TaskDetails from "./components/TaskDetails";
import ProtectedRoute from "./context/ProtectedRoute"; 
import Tasks from "./pages/Tasks";
import About from "./pages/About";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import TaskEdit from "./pages/TaskEdit";  // Import the TaskEdit component

const App = () => {
  return (
    <AuthProvider> 
      <TaskProvider>
        <Router>
          <Navbar />
          <Hero />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/home" element={<Home />} /> 
            <Route path="/about" element={<About />} />

            {/* Route for tasks list */}
            <Route path="/tasks" element={<Tasks />} />
            
            {/* Route for individual task details */}
            <Route path="/task/:id" element={<TaskDetails />} />
            
            {/* Route for editing task */}
            <Route path="/task/:id/edit" element={<TaskEdit />} />  {/* Add this route */}
          </Routes>
          <Footer />
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;
