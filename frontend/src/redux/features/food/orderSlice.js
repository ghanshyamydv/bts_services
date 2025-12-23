import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",

  initialState: {                 
  customerName: "",
  customerMobile: "",
  customerAddress: "",
  deliveryFee:0,
  totalPrice: 0,
  cartItems: [],                   // { product, quantity }
  location: {
    type: "Point",
    coordinates: []                // [longitude, latitude]
  },
  },

  reducers: {
    updateOrderField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value; // Update dynamically
    },

    // resetorderForm: (state) => {
    //   state.fullName = "";
    //   state.email = "";
    //   state.mobile = "";
    //   state.password = "";
    //   state.category="";
    // },
  },
});

export const { updateOrderField } = orderSlice.actions;
export default orderSlice.reducer;
