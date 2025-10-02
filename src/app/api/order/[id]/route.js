import {connectDB} from "./../../../../lib/dbconnect";  // <-- your MongoDB connection utility
import Order from "./../../../../models/order"; // <-- your Order mongoose model
import { NextResponse } from "next/server";

// DELETE /api/order/:id
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } =await params;
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Order deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
