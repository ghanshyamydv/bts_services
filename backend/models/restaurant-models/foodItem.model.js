import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Food name is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    originalPrice: {
      type: Number,
      required: [true, "Original price is required"],
      min: [0, "Price cannot be negative"],
    },

    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot exceed 100%"],
    },
    discountedPrice: {
      type: Number,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Pizza",
        "snacks",
        "Biryani",
        "juice",
        "dessert",
      ],
    },

    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    restaurant:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    }
  },
  {
    timestamps: true,
  }
);

foodItemSchema.pre("save", function (next) {
  this.discountedPrice = Math.round(
    this.originalPrice * (1 - this.discount / 100)
  );
  next();
});

const FoodItem =mongoose.model("FoodItem", foodItemSchema);
export default FoodItem;
