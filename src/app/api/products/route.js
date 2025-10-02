import { connectDB } from "./../../../lib/dbconnect";
import Product from "./../../../models/productschema";

// ✅ GET all products
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({});
    return new Response(JSON.stringify({ success: true, data: products }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}

// ✅ POST new product
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const product = await Product.create(body);
    return new Response(JSON.stringify({ success: true, data: product }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
    });
  }
}
