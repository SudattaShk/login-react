import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { logout, setUser } from "./features/authSlice";
import Login from "./components/Login";
import Register from "./components/Register";
import TodoApp from "./components/TodoApp";
import "./styles/App.css";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isLoginView, setIsLoginView] = useState(true);
  const [showDialog, setShowDialog] = useState(false);

  // Handle Login
  const handleLogin = (username, password, navigate) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = storedUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      dispatch(setUser(foundUser));
      navigate("/todo");
    } else {
      alert("Invalid username or password!");
    }
  };

  // Handle Register
  const handleRegister = (userData) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = storedUsers.some((user) => user.username === userData.username);

    if (userExists) {
      alert("User already exists!");
    } else {
      storedUsers.push(userData);
      localStorage.setItem("users", JSON.stringify(storedUsers));
      dispatch(setUser(userData));
      setShowDialog(true);
    }
  };

  return (
    <Router>
      <div className="app-container">
        <div className="auth-content">
          <Routes>
            {/* Login/Register Routes */}
            <Route
              path="/login"
              element={
                !isAuthenticated ? (
                  <div className="auth-container">
                    {isLoginView ? (
                      <Login onLogin={handleLogin} />
                    ) : (
                      <Register onRegister={handleRegister} />
                    )}
                    <span
                      className="toggle-link"
                      onClick={() => setIsLoginView(!isLoginView)}
                    >
                      {isLoginView ? "Go to Register" : "Go to Login"}
                    </span>
                  </div>
                ) : (
                  <Navigate to="/todo" />
                )
              }
            />

            <Route
              path="/register"
              element={<Register onRegister={handleRegister} />}
            />

            {/* Todo App Route */}
            <Route
              path="/todo"
              element={
                isAuthenticated ? (
                  <div className="welcome-container">
                    <h1>Welcome, {user?.firstName || "User"}!</h1>
                    <button
                      className="logout-btn"
                      onClick={() => dispatch(logout())}
                    >
                      Logout
                    </button>
                    <TodoApp />
                  </div>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* Default Route */}
            <Route
              path="/"
              element={<Navigate to={isAuthenticated ? "/todo" : "/login"} />}
            />
          </Routes>

          {/* Registration Success Dialog */}
          {showDialog && (
            <div className="dialog">
              <p>User registered successfully!</p>
              <button
                className="close-dialog-btn"
                onClick={() => setShowDialog(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* Add image on the right */}
        <div className="image-container">
          <img
            src="https://via.placeholder.com/400" // Replace with your desired image URL
            alt="Illustration"
          />
        </div>
      </div>
    </Router>
  );
};

export default App;
