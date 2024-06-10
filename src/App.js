import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./pages/landing/Landing";
import Main from "./pages/main/Main";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Main />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
