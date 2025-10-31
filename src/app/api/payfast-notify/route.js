import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const bodyText = await req.text(); // PayFast sends raw form data
    const params = new URLSearchParams(bodyText);
    const orderId = params.get("custom_str1"); // we sent this earlier
    const payment_status = params.get("payment_status");

    console.log("PayFast Notify Received:", Object.fromEntries(params));

    // 🧩 Example: update your database order status
    if (payment_status === "COMPLETE") {
      // TODO: update your DB here
      console.log(`✅ Order ${orderId} marked as PAID`);
    } else {
      console.log(`⚠️ Order ${orderId} not paid yet`);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PayFast Notify Error:", err);
    return NextResponse.json({ success: false });
  }
}
