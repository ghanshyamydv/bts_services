import mongoose from "mongoose";

// Create sub schema for cartItem
const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodItem",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  { _id: false }   // <-- IMPORTANT
);

// Main cart schema
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    cartItems: [cartItemSchema], // <-- use sub schema
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
