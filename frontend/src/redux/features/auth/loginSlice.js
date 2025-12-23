import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    email: "",
    password: "",
  },

  reducers: {
    updateLoginField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value; // Update dynamically
    },

    resetLoginForm: (state) => {
      state.email = "";
      state.password = "";
    },
  },
});

export const { updateLoginField, resetLoginForm } = loginSlice.actions;
export default loginSlice.reducer;
