import React, { useState } from "react";
import LoginBox from "../../components/login-box/LoginBox";
import RegisterBox from "../../components/register-box/RegisterBox";
import "./Landing.css";

function Landing() {
  const [showLogin, setShowLogin] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const handleSignInClick = () => {
    setShowLogin(true);
  };

  const handleRegisterClick = () => {
    setActiveTab("register");
  };

  return (
    <div>
      <div className={`bg-container ${showLogin ? "darken" : ""}`}>
        <div className={`navbar-container ${showLogin ? "centered" : ""}`}>
          <div className="name">MovieTracker</div>
          {!showLogin ? (
            <div className="button" onClick={handleSignInClick}>
              Sign In
            </div>
          ) : (
            <> </>
          )}
        </div>
        {!showLogin ? (
          <>
            <div className="tagline">
              From Watchlist to Wishlist:
              <br />
              Track Your Movie Moments
              <div className="button" onClick={handleSignInClick}>
                Get Started
              </div>
            </div>
          </>
        ) : (
          <div className="login-container">
            <div className="tab-container">
              <h1
                className={`tab-button ${
                  activeTab === "login" ? "active" : ""
                }`}
                onClick={() => setActiveTab("login")}
              >
                Login
              </h1>
              <div className="tab-separator"></div>
              <h1
                className={`tab-button ${
                  activeTab === "register" ? "active" : ""
                }`}
                onClick={() => setActiveTab("register")}
              >
                Register
              </h1>
            </div>
            {activeTab === "login" ? (
              <LoginBox onRegisterClick={handleRegisterClick} />
            ) : (
              <RegisterBox />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Landing;
