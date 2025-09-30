import { NextResponse } from "next/server";
import { connectDB } from "./../../../lib/dbconnect";
import Contact from "./../../../models/contact";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const newContact = await Contact.create(body);

    return Response.json({ success: true, data: newContact }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 400 });
  }
}



export async function GET() {
  try {
    console.log('🔍 Attempting to connect to MongoDB...');
    await connectDB();
    console.log('✅ MongoDB connected successfully');

    console.log('🔍 Attempting to fetch messages...');
    const messages = await Contact.find().sort({ createdAt: -1 });
    console.log(`✅ Found ${messages.length} messages`);

    return NextResponse.json({ 
      success: true, 
      data: messages 
    });

  } catch (error) {
    console.error('❌ API Error details:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}