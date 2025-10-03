import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbconnect";
import Admin from "@/models/login"; // make sure correct path

export async function POST(req) {
  try {
    await connectDB();
    const {  email, oldPassword, newPassword } = await req.json();

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }
    

    if (admin.password !== oldPassword) {
      return NextResponse.json({ error: "Old password is incorrect" }, { status: 401 });
    }

    admin.password = newPassword;
    
    await admin.save();

    return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
