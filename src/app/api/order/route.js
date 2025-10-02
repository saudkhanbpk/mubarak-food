import { NextResponse } from "next/server";
import {connectDB} from "./../../../lib/dbconnect";
import Order from "./../../../models/order";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const newOrder = await Order.create(body);

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error) {
    console.error("Order save error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, orders });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
