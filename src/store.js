import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./features/todosSlice";
import authReducer from "./features/authSlice"; // Add authReducer if authentication is required

// Create the store with reducers
const store = configureStore({
  reducer: {
    todos: todosReducer, // Renamed from "Todo" to "todos" for consistency
    auth: authReducer,   // Add authentication reducer here if needed
  },
});

export default store;
