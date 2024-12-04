import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo } from "../features/todosSlice";

const TodoApp = () => {
  const [todoText, setTodoText] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo(todoText));
    setTodoText("");
  };

  const handleRemove = (id) => {
    dispatch(removeTodo(id));
  };

  const handleLogout = () => {
    // Logout logic (e.g., clear user data, redirect to login, etc.)
    console.log("Logging out...");
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Welcome Message */}
        <div className="welcome-message">Welcome User</div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="logout-button"
        >
          Logout
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
              border: "none",
              fontSize: 20,
            }}
          />
          <button
            type="submit"
            style={{
              padding: 12,
              borderRadius: 25,
              fontSize: 15,
              margin: 20,
            }}
          >
            Add
          </button>
        </form>
        <ul className="allTodos">
          {todos.map((todo) => (
            <li key={todo.id} className="singleTodo">
              <span className="todoText">{todo.text}</span>
              <button
                onClick={() => handleRemove(todo.id)}
                style={{
                  borderRadius: 25,
                  padding: 10,
                  border: "none",
                  color: "white",
                  background: "red",
                }}
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
