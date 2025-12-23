import { createSlice } from "@reduxjs/toolkit";

const addItemSlice = createSlice({
  name: "addItem",
  initialState: {
    name: "",
    description: "",
    originalPrice: "",
    discount: "",
    category: "",
    image: "",
  },

  reducers: {
    updateAddItemField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value; // Update dynamically
    },

    resetAddItemForm: (state) => {
      state.name = "";
      state.description = "";
      state.originalPrice = "";
      state.discount = "";
      state.category="";
      state.image="";
    },
  },
});

export const { updateAddItemField, resetAddItemForm} = addItemSlice.actions;
export default addItemSlice.reducer;
