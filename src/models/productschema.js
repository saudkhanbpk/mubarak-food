import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      default: "", // image URL
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["available", "out-of-stock", "discontinued"],
      default: "available",
    },
    quantity: {
      type: Number,
      default: 1,
      min: 0,
    },
    weight: {
      type: String, // e.g. "500g" or "2kg"
      default: "",
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    shippingFees: {
      type: Number,
      default: 0,
      min: 0,
    },
    otherCharges: {
      type: Number,
      default: 0,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0, // percentage or fixed depending on logic
      min: 0,
    },
  },
  { timestamps: true } // auto adds createdAt, updatedAt
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);


export default Product;
