'use client';
import { useState } from 'react';
import FileUploader from '@/components/admin/FileUploader';

export default function TestUploadPage() {
    const [imageUrl, setImageUrl] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);

    return (
        <div className="max-w-md mx-auto mt-10 space-y-6">
            <h1 className="text-xl font-bold">🧪 Cloudinary Upload Test</h1>

            <FileUploader label="Upload Image" onUpload={(url) => setImageUrl(url)} />
            <FileUploader label="Upload Audio" onUpload={(url) => setAudioUrl(url)} />

            {imageUrl && (
                <div>
                    <h3>✅ Image Uploaded:</h3>
                    <img src={imageUrl} alt="Uploaded" className="max-h-48 rounded border mt-2" />
                    <code className="block text-xs mt-1">{imageUrl}</code>
                </div>
            )}

            {audioUrl && (
                <div>
                    <h3>✅ Audio Uploaded:</h3>
                    <audio controls className="mt-2 w-full">
                        <source src={audioUrl} />
                    </audio>
                    <code className="block text-xs mt-1">{audioUrl}</code>
                </div>
            )}
        </div>
    );
}
