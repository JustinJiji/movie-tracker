import React from "react";
import "./Home.css";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="main-content">
        {/* Profile section or other content */}
        <div className="profile-section">
          <h2>Profile Name</h2>
          <p>Profile details...</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
