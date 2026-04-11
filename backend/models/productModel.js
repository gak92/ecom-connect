import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please enter product description"],
      maxlength: [500, "Product description cannot exceed 500 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
      maxLength: [7, "Product price cannot exceed 7 digits"],
      default: 0.0,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    image: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Please enter a product category"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter Product Stock"],
      min: [0, "Product stock cannot be negative"],
      default: 1,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
          required: [true, "Please enter your name"],
        },
        rating: {
          type: Number,
          required: [true, "Please enter your rating"],
        },
        comment: {
          type: String,
          required: [true, "Please enter your comment"],
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Product", productSchema);
