import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    users: [], // Store all users
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    setUsers(state, action) {
      state.users = action.payload; // Save all users
    },
  },
});

export const { setUser, logout, setUsers } = authSlice.actions;
export default authSlice.reducer;
