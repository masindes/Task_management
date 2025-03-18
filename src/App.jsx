// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import About from "./pages/About";
import Footer from "./components/Footer"; 

const App = () => {
  return (
    <Router>
      <Navbar />
      <Hero />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer /> {/* Add the Footer component here */}
    </Router>
  );
};

export default App;