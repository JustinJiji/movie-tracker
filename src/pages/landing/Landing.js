import React, { useState } from "react";
import LoginBox from "../../components/login-box/LoginBox";
import RegisterBox from "../../components/register-box/RegisterBox";
import Loader from "../../components/others/Loader"; // Import Loader component
import "./Landing.css";

function Landing() {
  const [showLogin, setShowLogin] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(false); // State to manage loading
  const [error, setError] = useState(""); // State for error handling

  const handleSignInClick = () => {
    setShowLogin(true);
  };

  const handleRegisterClick = () => {
    setActiveTab("register");
  };

  function reloadPage() {
    window.location.reload();
  }

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setLoading(false); // Set loading to false on error
  };

  return (
    <div>
      {loading && <Loader />}
      <div className={`bg-container ${showLogin ? "darken" : ""}`}>
        <div className={`navbar-container ${showLogin ? "centered" : ""}`}>
          <div className="name" onClick={reloadPage}>
            MovieTracker
          </div>
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
              <LoginBox
                onRegisterClick={handleRegisterClick}
                setLoading={setLoading}
                handleError={handleError}
              />
            ) : (
              <RegisterBox setLoading={setLoading} handleError={handleError} />
            )}
            {error && <div className="error">{error}</div>}
          </div>
        )}
      </div>
    </div>
  );
}

export default Landing;
