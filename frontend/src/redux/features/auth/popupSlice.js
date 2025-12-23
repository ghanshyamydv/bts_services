// import { createSlice } from "@reduxjs/toolkit";

// const popupSlice = createSlice({
//   name: "popup",
//   initialState: {
//     signupOpen: false,
//   },
//   reducers: {
//     openSignup: (state) => {
//       state.signupOpen = true;
//     },
//     closeSignup: (state) => {
//       state.signupOpen = false;
//     },
//   },
// });

// export const { openSignup, closeSignup } = popupSlice.actions;
// export default popupSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    open: false,      // controls if popup is open
    type: "",   // "signup" or "login"
  },
  reducers: {
    openPopup: (state, action) => {
      state.open = true;
      state.type = action.payload; // "signup" or "login"
    },
    closePopup: (state) => {
      state.open = false;
    },
  },
});

export const { openPopup, closePopup } = popupSlice.actions;
export default popupSlice.reducer;
