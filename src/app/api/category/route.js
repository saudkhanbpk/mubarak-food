import { NextResponse } from "next/server";
import {connectDB} from "./../../../lib/dbconnect";
import Category from "./../../../models/Category";

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find().sort({ createdAt: -1 });
    return Response.json({ success: true, data: categories });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    console.log("Request Body:", body); // 👀 Check what frontend is sending

    const newCategory = await Category.create(body);
    return Response.json({ success: true, data: newCategory }, { status: 201 });
  } catch (error) {
    console.error("Error in /api/category:", error);
    return Response.json({ success: false, error: error.message }, { status: 400 });
  }
}

