'use client';
import { useState } from 'react';

export default function FileUploader({ label, onUpload }) {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleChange = async (e) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));
        setUploading(true);

        const formData = new FormData();
        formData.append('file', selectedFile);

        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        setUploading(false);

        if (data.success) {
            onUpload(data.url); // send Cloudinary URL to parent
        } else {
            alert('Upload failed: ' + data.error);
        }
    };

    return (
        <div className="mb-4">
            <label className="block mb-1 font-medium text-sm">{label}</label>
            <input type="file" accept="image/*,audio/*" onChange={handleChange} />

            {uploading && <p className="text-xs text-gray-500 mt-1">Uploading...</p>}

            {previewUrl && file?.type.startsWith('image') && (
                <img src={previewUrl} alt="Preview" className="mt-2 max-h-40 rounded border" />
            )}

            {previewUrl && file?.type.startsWith('audio') && (
                <audio controls className="mt-2 w-full">
                    <source src={previewUrl} type={file?.type} />
                </audio>
            )}
        </div>
    );
}
