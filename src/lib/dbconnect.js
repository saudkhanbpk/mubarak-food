// lib/mongodb.js
import mongoose from "mongoose";

let isConnected = false; // Track the connection state

export async function connectDB() {
  if (isConnected) {
    console.log("⚡ Already connected to MongoDB");
    return;
  }

  // Read environment variable
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/foodApp";

  // Debugging: print to ensure value is being read (don't keep in production)
  console.log("📌 MONGODB_URI from env:", uri);

  if (!uri) {
    throw new Error(
      "❌ MONGODB_URI is not defined in .env.local. Please set it first."
    );
  }

  try {
    await mongoose.connect(uri, {
      dbName: "foodApp", // ✅ explicitly set DB name
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("✅ MongoDB Connected successfully:", uri);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    throw error;
  }
}
