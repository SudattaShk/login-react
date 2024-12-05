import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../features/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = { username: "", password: "" };

    if (!username.trim()) {
      newErrors.username = "Username is required.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return !newErrors.username && !newErrors.password; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      const foundUser = storedUsers.find(
        (user) => user.username === username && user.password === password
      );

      if (foundUser) {
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        dispatch(setUser(foundUser));
        navigate("/todo");
      } else {
        alert("Invalid username or password!");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
