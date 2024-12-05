import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: {}, // State is an object with user emails as keys
  reducers: {
    addTodo: (state, action) => {
      const { email, text } = action.payload;
      if (!state[email]) state[email] = [];
      const todoText = text.trim();
      if (todoText && !state[email].some((todo) => todo.text === todoText)) {
        state[email].push({ id: Date.now(), text: todoText });
      }
    },
    removeTodo: (state, action) => {
      const { email, id } = action.payload;
      if (state[email]) {
        state[email] = state[email].filter((todo) => todo.id !== id);
      }
    },
    loadTodos: (state, action) => {
      const { email, todos } = action.payload;
      state[email] = todos || [];
    },
  },
});

export const { addTodo, removeTodo, loadTodos } = todosSlice.actions;
export default todosSlice.reducer;
