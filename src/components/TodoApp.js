import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo } from "../features/todosSlice";
import { FaSignOutAlt } from "react-icons/fa"; // Import a logout icon from react-icons
import { logout } from "../features/authSlice";

const TodoApp = () => {
  const {  user } = useSelector((state) => state.auth);
  const [todoText, setTodoText] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoText.trim() === "") return; // Prevent adding empty todos
    dispatch(addTodo(todoText));
    setTodoText("");
  };

  const handleRemove = (id) => {
    dispatch(removeTodo(id));
  };


  return (
    <div className="App">
      <header className="App-header">
        {/* Logout Button with Icon positioned to the top right */}
        <h1>Welcome, {user?.firstName || "User"}!</h1>    
        <button
          className="logout-icon-btn"
          onClick={() => dispatch(logout())}
        >Logout
          <FaSignOutAlt size={24} /> {/* Logout icon */}
        </button>
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
          <button
            type="submit"
            className="styled-button"
          >
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
