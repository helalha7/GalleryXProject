import { NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinaryUpload';

export async function POST(req) {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
        return NextResponse.json({ success: false, error: 'No valid file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const mimetype = file.type;
    const filename = file.name.split('.').slice(0, -1).join('');

    try {
        const result = await uploadToCloudinary(buffer, filename, mimetype, 'museum');
        return NextResponse.json({ success: true, url: result.secure_url });
    } catch (err) {
        console.error('Cloudinary upload error:', err);
        return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
    }
}
