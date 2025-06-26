'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchArtifactsByGallery } from '@/lib/api/artifact';

export default function GalleryArtifactsPage() {
    const { galleryName } = useParams();
    const [artifacts, setArtifacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;

    useEffect(() => {
        if (!galleryName || !token) return;

        const fetchData = async () => {
            try {
                const normalizedName = decodeURIComponent(galleryName).toUpperCase(); // normalize to capital
                const data = await fetchArtifactsByGallery(normalizedName, token);
                setArtifacts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [galleryName, token]);

    if (loading) return <div className="p-6">Loading...</div>;
    if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">
                Artifacts in "{decodeURIComponent(galleryName)}"
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {artifacts.map((artifact) => (
                    <div key={artifact._id} className="bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-bold">{artifact.name}</h2>
                        <p>{artifact.artist}</p>
                        <p>{artifact.createdYear}</p>
                        <img src={artifact.imageUrl} alt={artifact.name} className="w-full h-40 object-cover mt-2 rounded" />
                    </div>
                ))}
            </div>
        </div>
    );
}
