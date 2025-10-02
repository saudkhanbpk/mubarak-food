import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dropOffAddress: { type: String, required: true },
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    instructions: { type: String },

    payment: { type: String, default: "Cash on Delivery" },

    items: [
      {
        title: String,
        description: String,
        price: Number,
        quantity: { type: Number, default: 1 },
        image: String,
        shippingFees: { type: Number, default: 0 },
        otherCharges: { type: Number, default: 0 },
        discount: { type: Number, default: 0 },
      },
    ],

    subtotal: Number,
    shippingFees: Number,
    otherCharges: Number,
    discount: Number,
    total: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
