import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { setUser, setUsers } from "./features/authSlice";
import Login from "./components/Login";
import Register from "./components/Register";
import TodoApp from "./components/TodoApp";
import "./styles/App.css";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isLoginView, setIsLoginView] = useState(true);

  // Load users and the current user from localStorage into Redux on app load
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedCurrentUser = JSON.parse(localStorage.getItem("currentUser"));

    dispatch(setUsers(storedUsers)); // Load all users into Redux
    if (storedCurrentUser) {
      dispatch(setUser(storedCurrentUser));
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="app-container">
        <div className="auth-content">
          <Routes>
            {/* Redirect root URL to login */}
            <Route
              path="/"
              element={<Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={
                !isAuthenticated ? (
                  <div className="auth-container">
                    {isLoginView ? (
                      <Login />
                    ) : (
                      <Register />
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
            <Route path="/register" element={<Register />} />
            <Route
              path="/todo"
              element={
                isAuthenticated ? <TodoApp /> : <Navigate to="/login" />
              }
            />
            {/* Redirect unknown routes to login */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
        <div className="image-container"></div>
      </div>
    </Router>
  );
};

export default App;
