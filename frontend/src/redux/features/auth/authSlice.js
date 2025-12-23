import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    user: null,
    isAuthenticated: false,
    socket:null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, user } = action.payload;
      state.accessToken = accessToken;
      state.user = user;
      state.isAuthenticated = true;
    },

    updateAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },

    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;
    },

    setSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export const { setCredentials, updateAccessToken, logout, setSocket } = authSlice.actions;
export default authSlice.reducer;
