import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbconnect";
import Admin from "@/models/login";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();
    console.log("Request body:", email, password);

    const admin = await Admin.findOne({ email }).lean(); 
    console.log("Admin found:", admin);

    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    if (admin.password !== password) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
