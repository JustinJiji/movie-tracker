import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../firebase/Auth";
import "./RegisterBox.css";

function RegisterBox({ setLoading, handleError }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); 
    if (password !== confirmPassword) {
      handleError("Passwords do not match");
      setLoading(false); 
      return;
    }

    try {
      const user = await signUp(username, password, name);
      console.log("User registered:", user);
      navigate("/main");
    } catch (error) {
      console.error("Registration failed:", error);
      handleError(error.message); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister}>
        <input
          className="textbox"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <input
          className="textbox"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button className="btn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterBox;
