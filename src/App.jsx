import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
// import Home from '../pages/Home'; // Import your pages/components
// import About from '../pages/About'; // Example of another page

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
      
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;