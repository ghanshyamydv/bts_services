import mongoose from 'mongoose';
const itemSchema = new mongoose.Schema(
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

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerName: {
    type: String,
    required: true,
  },
  customerMobile: {
    type: String,
    required: true,
  },
  customerAddress: {
    type: String,
  },
  deliveryFee: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    default: 'Cash on Delivery', // Default payment method
  },
  cartItems: [itemSchema],
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
      validate: {
        validator: function(coords) {
          // Check if array exists, has exactly 2 elements, and both are numbers
          return Array.isArray(coords) && 
                 coords.length === 2 && 
                 typeof coords[0] === 'number' && 
                 typeof coords[1] === 'number' &&
                 !isNaN(coords[0]) && 
                 !isNaN(coords[1]);
        },
        message: 'Coordinates must be an array of exactly two numbers [longitude, latitude]'
      }
    },
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', "Preparing","Ready to Pickup", 'Out for Delivery', 'Delivered', "Cancelled"], // Order status
    default: 'Pending',
  },
},{ timestamps: true });

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

export default Order;