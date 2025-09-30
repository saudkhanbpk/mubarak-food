// src/app/api/contact-us/[id]/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbconnect";
import Contact from "@/models/contact";

export async function DELETE(request, { params }) {
  try {
    const { id } = params; // Get id from route params
    
    console.log('🔍 Deleting message with ID:', id);
    
    if (!id) {
      return NextResponse.json({ 
        success: false, 
        error: 'Message ID is required' 
      }, { status: 400 });
    }

    await connectDB();
    const deletedMessage = await Contact.findByIdAndDelete(id);
    
    if (!deletedMessage) {
      return NextResponse.json({ 
        success: false, 
        error: 'Message not found' 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Message deleted successfully' 
    });
    
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to delete message' 
    }, { status: 500 });
  }
}