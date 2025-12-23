import { createSlice } from "@reduxjs/toolkit";

const signupSlice = createSlice({
  name: "signup",

  initialState: {
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    category:"",
    address:"",
    location: {
      type: "Point",
      coordinates: []
      },
    aboutMe:"",
  },

  reducers: {
    updateSignupField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value; // Update dynamically
    },

    resetSignupForm: (state) => {
      state.fullName = "";
      state.email = "";
      state.mobile = "";
      state.password = "";
      state.category="";
    },
  },
});

export const { updateSignupField, resetSignupForm } = signupSlice.actions;
export default signupSlice.reducer;
