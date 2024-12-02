import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import UserList from './components/UserList';
import './styles/App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoginView, setIsLoginView] = useState(true);

  const handleRegister = (newUser) => {
    setUsers([...users, newUser]);
    alert('Registration successful! Please log in.');
    setIsLoginView(true);
  };

  const handleLogin = ({ username, password }) => {
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
    } else {
      alert('Invalid username or password.');
    }
  };

  return (
    <div className="app-container">
      {!currentUser ? (
        <div className="auth-container">
          {isLoginView ? (
            <Login onLogin={handleLogin} />
          ) : (
            <Register onRegister={handleRegister} />
          )}
          <button onClick={() => setIsLoginView(!isLoginView)}>
            {isLoginView ? 'Go to Register' : 'Go to Login'}
          </button>
        </div>
      ) : (
        <div className="welcome-container">
          <h1>Welcome, {currentUser.username}!</h1>
          <button onClick={() => setCurrentUser(null)}>Logout</button>
          <UserList users={users} />
        </div>
      )}
    </div>
  );
};

export default App;
