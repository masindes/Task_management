// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import About from "./pages/About";
import Login from "./pages/Login"; // Import Login page
// import Register from "./pages/Register"; // Import Register page
import Footer from "./components/Footer";
import ProtectedRoute from "./context/ProtectedRoute"; // Import ProtectedRoute

const App = () => {
  return (
    <AuthProvider> {/* Wrap the app with AuthProvider */}
      <TaskProvider>
        <Router>
          <Navbar />
          <Hero />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} /> {/* Add Login route */}
            <Route path="/home" element={<Home />} /> 
      
            <Route
              path="/tasks"
              element={
                // <ProtectedRoute> {/* Protect the Tasks route */}
                  <Tasks />
                // {/* </ProtectedRoute> */}
              }
            />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;