import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please enter a valid email"], // simple email validation
    },
    phone: {
      type: String,
      required: true,
      // trim: true,
      // match: [/^[0-9]{10,15}$/, "Please enter a valid phone number"], // accepts 10–15 digits
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: [10, "Message must be at least 10 characters long"],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Prevent model overwrite issue in dev/hot-reload
export default mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
