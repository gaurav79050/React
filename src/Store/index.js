import { createSlice, configureStore } from "@reduxjs/toolkit";
const initialState = { backlog: [], todo: [], ongoing: [], done: [] };

const taskSlice = createSlice({
  name: "backlog",
  initialState,
  reducers: {
    fetch: (state, action) => {
      return {
        backlog: action.payload.backlog,
        todo: action.payload.todo,
        ongoing: action.payload.ongoing,
        done: action.payload.done,
      };
    },
  },
});

const initialAuthState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") || false,
  username: localStorage.getItem("username") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("username", action.payload.username);
      state.isAuthenticated = true;
      state.username = action.payload.username;
    },
    logout: (state) => {
      localStorage.clear();
      state.isAuthenticated = false;
      state.username = null;
    },
  },
});

export const store = configureStore({
  reducer: {
    tasks: taskSlice.reducer,
    auth: authSlice.reducer,
  },
});

export const taskActions = taskSlice.actions;
export const authActions = authSlice.actions;

export default store;
