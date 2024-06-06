import React, { useState } from "react";
import "./LoginBox.css";

function LoginBox({ onRegisterClick }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <form>
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
          type="text"
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
