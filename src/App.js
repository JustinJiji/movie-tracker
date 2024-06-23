import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./pages/landing/Landing";
import Main from "./pages/main/Main";
import ViewDetails from "./pages/view-details/ViewDetails";
import Admin from "./pages/admin/Admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/main" element={<Main />} />
        <Route path="/viewdetails/:media_type/:id" element={<ViewDetails />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
