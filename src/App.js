import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import "./App.css";
import Landing from "./pages/landing/Landing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
