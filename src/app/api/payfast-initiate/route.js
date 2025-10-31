import crypto from "crypto";

export async function POST(req) {
  try {
    const body = await req.json();
    const { amount, customer_email, fullName, orderId } = body;

    const merchant_id = "10043248";
    const merchant_key = "f1nl5j688nzhl";
    const passphrase = "muhammadzahidkhan"; // from PayFast dashboard

    const return_url = `${process.env.NEXT_PUBLIC_APP_URL}/payment-success`;
    const cancel_url = `${process.env.NEXT_PUBLIC_APP_URL}/payment-cancel`;
    const notify_url = `${process.env.NEXT_PUBLIC_APP_URL}/api/payfast-notify`;

    const data = {
      merchant_id,
      merchant_key,
      return_url,
      cancel_url,
      notify_url,
      amount,
      item_name: "Mobarak Food",
      name_first: fullName,
      email_address: customer_email,
      custom_str1: orderId, // store your order ID here
    };

    // Convert to query string
    const query = Object.keys(data)
      .map(
        (key) =>
          `${key}=${encodeURIComponent(data[key]).replace(/%20/g, "+")}`
      )
      .join("&");

    // Generate signature (HMAC SHA256)
    const signature = crypto
      .createHmac("sha256", passphrase)
      .update(query)
      .digest("hex");

    const checkoutUrl = `https://sandbox.payfast.co.za/eng/process?${query}&signature=${signature}`;

    return Response.json({ success: true, checkoutUrl });
  } catch (error) {
    console.error("PayFast Error:", error);
    return Response.json({ success: false, error: "Payment initiation failed" });
  }
}
