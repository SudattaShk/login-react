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
  const [errors, setErrors] = useState(""); // Error message state

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

  // Validate the todo input
  const validateTodo = (text) => {
    if (text.trim() === "") {
      setErrors("Todo cannot be empty.");
      return false;
    }
    if (todos.some((todo) => todo.text.toLowerCase() === text.trim().toLowerCase())) {
      setErrors("This todo already exists.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(""); // Clear previous errors
    if (validateTodo(todoText)) {
      dispatch(addTodo({ email: user.email, text: todoText.trim() }));
      setTodoText(""); // Clear input field
    }
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
          {/* Inline error message */}
          {errors && <p style={{ color: "red", marginTop: "5px" }}>{errors}</p>}
        </form>
        {/* Scrollable Todo List */}
        <ul
          className="allTodos"
          style={{
            maxHeight: "300px", // Limit the height
            overflowY: "scroll", // Add vertical scrollbar
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            width: "100%",
          }}
        >
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
