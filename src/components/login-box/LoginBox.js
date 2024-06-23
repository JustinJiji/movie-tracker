// src/components/LoginBox.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../firebase/Auth";
import "./LoginBox.css";

function LoginBox({ onRegisterClick, setLoading, handleError }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { user, data, isAdmin } = await signIn(username, password);
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/main");
      }
    } catch (error) {
      console.error("Login failed:", error);
      handleError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <input
          className="textbox"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="textbox"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn" type="submit">
          Login
        </button>
      </form>
      <div className="registerline" onClick={onRegisterClick}>
        <h3>Don't have an account? </h3>
        <h3>Register</h3>
      </div>
    </>
  );
}

export default LoginBox;
