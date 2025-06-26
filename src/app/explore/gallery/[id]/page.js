'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

import InteractiveGallery from '@/components/gallery/InteractiveGallery';
import Modal from '@/components/shared/Modal';
import ArtifactDetail from '@/components/artifact/ArtifactDetail';
import TicketPrompt from '@/components/explore/TicketPrompt';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

import { fetchGalleryById } from '@/lib/api/gallery';
import { fetchArtifactsByGallery } from '@/lib/api/artifact';
import { getTokenFromSession } from '@/utils/sessionStorageHandler';
import useRequireTicket from '@/hooks/guards/useRequireTicket';

export default function GalleryPage() {
    const { id } = useParams();
    const router = useRouter();
    const { hasValidTicket, loading: ticketLoading } = useRequireTicket();

    const [gallery, setGallery] = useState(null);
    const [artifacts, setArtifacts] = useState([]);
    const [selectedArtifact, setSelectedArtifact] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const token = getTokenFromSession();

    useEffect(() => {
        if (!id || !token) return;

        async function loadData() {
            try {
                setLoading(true);
                const galleryData = await fetchGalleryById(id, token);
                const artifactData = await fetchArtifactsByGallery(galleryData.name.toUpperCase(), token);
                setGallery(galleryData);
                setArtifacts(artifactData);
            } catch (err) {
                console.error('Failed to load gallery or artifacts:', err.message);
                setError(err.message || 'Failed to load gallery content.');
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [id, token]);

    const handleArtifactClick = (artifact) => {
        setSelectedArtifact(artifact);
        setIsModalOpen(true);
    };

    if (ticketLoading || loading) return <LoadingSpinner message="Loading gallery..." />;
    if (!hasValidTicket) return <TicketPrompt onBack={() => router.push('/explore')} />;
    if (error || !gallery) return <p className="text-center text-red-500 mt-10">{error || 'Gallery not found.'}</p>;

    return (
        <div className="w-full bg-[#f9fafb] text-[#111827] dark:bg-gray-900 dark:text-white transition-colors duration-300">
            <main className="px-4 py-6 sm:px-6 lg:px-12 max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                    <h1 className="text-2xl font-bold">{gallery.name}</h1>
                    <button
                        onClick={() => router.push('/explore')}
                        className="inline-flex items-center text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                    >
                        <svg className="mr-1" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                        Back to Museum Map
                    </button>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed max-w-3xl">
                    {gallery.description}
                </p>

                <InteractiveGallery
                    galleryImage={gallery.mapImage}
                    artifacts={artifacts}
                    onArtifactClick={handleArtifactClick}
                />

                <div className="mt-6 text-center text-gray-600 dark:text-gray-300">
                    <p className="text-sm italic">Explore unique artifacts from the {gallery.name}.</p>
                </div>

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={selectedArtifact?.name || 'Artifact Details'}
                >
                    <ArtifactDetail artifact={selectedArtifact} />
                </Modal>
            </main>
        </div>
    );
}
