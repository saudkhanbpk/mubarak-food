import { connectDB } from "./../../../../lib/dbconnect";
import Category from "./../../../../models/Category";

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) {
      return Response.json({ success: false, error: "Category not found" }, { status: 404 });
    }

    return Response.json({ success: true, data: deleted }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
