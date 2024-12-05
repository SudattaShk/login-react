import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo, loadTodos } from "../features/todosSlice";
import { FaSignOutAlt } from "react-icons/fa";
import { logout } from "../features/authSlice";

const TodoApp = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Current logged-in user
  const todos = useSelector((state) => state.todos[user.email] || []); // Get todos for the current user
  const [todoText, setTodoText] = useState("");

  // Load todos for the current user from localStorage on component mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || {};
    if (user.email) {
      dispatch(loadTodos({ email: user.email, todos: storedTodos[user.email] }));
    }
  }, [user.email, dispatch]);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || {};
    storedTodos[user.email] = todos;
    localStorage.setItem("todos", JSON.stringify(storedTodos));
  }, [todos, user.email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoText.trim() === "") return; // Prevent adding empty todos
    dispatch(addTodo({ email: user.email, text: todoText }));
    setTodoText("");
  };

  const handleRemove = (id) => {
    dispatch(removeTodo({ email: user.email, id }));
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Logout Button */}
        <div className="logout-container">
          <h1>Welcome, {user.firstName || "User"}!</h1>
          <button
            className="logout-icon-btn"
            onClick={() => dispatch(logout())}
          >
            Logout <FaSignOutAlt size={24} />
          </button>
        </div>
        <h2>Todo List</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter a todo"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            style={{
              width: 350,
              padding: 10,
              borderRadius: 20,
              border: "1px solid #ccc",
              fontSize: 18,
            }}
          />
          <button type="submit" className="styled-button">
            Add To-Do
          </button>
        </form>
        <ul className="allTodos">
          {todos.map((todo) => (
            <li key={todo.id} className="singleTodo">
              <span className="todoText">{todo.text}</span>
              <button
                onClick={() => handleRemove(todo.id)}
                className="styled-button delete-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
};

export default TodoApp;
