// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Employees from './pages/Employees';
import Home from './pages/Home';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/employees" element={<Employees />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
