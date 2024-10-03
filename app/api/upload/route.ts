// app/api/upload/route.ts
import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  try {
    const fileStr: string = body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'default',
    });
    
    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}