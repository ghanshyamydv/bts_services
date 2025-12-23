import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQty: 0,
  },
  reducers: {
    updateCart(state, action) {
      state.items = action.payload;
      state.totalQty = action.payload.reduce((acc, it) => acc + it.quantity, 0);
    }
  },
});

export const { updateCart } = cartSlice.actions;
export default cartSlice.reducer;
