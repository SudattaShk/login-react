import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { setUser } from "./features/authSlice";
import Login from "./components/Login";
import Register from "./components/Register";
import TodoApp from "./components/TodoApp";
import "./styles/App.css";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isLoginView, setIsLoginView] = useState(true);
  const [showDialog, setShowDialog] = useState(false);

  // Load the user from localStorage into Redux when the app loads
  useEffect(() => {
    const storedCurrentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedCurrentUser) {
      dispatch(setUser(storedCurrentUser));
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="app-container">
    
        {/* Auth Content (Login/Register Forms) */}
        <div className="auth-content">
          <Routes>
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
                isAuthenticated ? (
                  <div className="welcome-container">
                    
                    <TodoApp />
                  </div>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

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

        {/* Right Panel with Background Image */}
        <div className="image-container"></div>
      </div>
    </Router>
  );
};

export default App;
