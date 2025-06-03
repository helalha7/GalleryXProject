'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Modal from '@/components/shared/Modal';
import ArtifactDetail from '@/components/artifact/ArtifactDetail';
import TicketPrompt from '@/components/explore/TicketPrompt';
import { galleryMap } from '@/data/galleryConfig';
import useRequireTicket from '@/hooks/guards/useRequireTicket';

export default function GalleryPage() {
    const { slug } = useParams();
    const router = useRouter();
    const gallery = galleryMap[slug];

    const { hasValidTicket, loading } = useRequireTicket();
    const [selectedArtifact, setSelectedArtifact] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] dark:bg-gray-900">
                <p className="text-lg text-[#111827] dark:text-gray-100">Checking ticket...</p>
            </div>
        );
    }

    if (!gallery) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] dark:bg-gray-900">
                <p className="text-lg text-red-600 dark:text-red-400">Gallery not found</p>
            </div>
        );
    }

    if (!hasValidTicket) {
        return <TicketPrompt onBack={() => router.push('/explore')} />;
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#f9fafb] dark:bg-gray-900 transition-colors duration-300">
            <main className="flex-1 p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-display font-bold text-[#111827] dark:text-white">
                            {gallery.title}
                        </h1>
                        <button
                            onClick={() => router.push('/explore')}
                            className="flex items-center text-blue-500 hover:text-blue-400 dark:text-blue-300 dark:hover:text-blue-200 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="mr-2"
                            >
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                            Back to Museum Map
                        </button>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-8">{gallery.description}</p>

                    <div className="p-8 rounded-2xl shadow border border-white dark:border-gray-700 bg-white dark:bg-gray-800 transition">
                        <div
                            onClick={(e) => {
                                if (slug === 'egyptian-gallery' && e.target.dataset.artifact) {
                                    try {
                                        const artifact = JSON.parse(e.target.dataset.artifact);
                                        setSelectedArtifact(artifact);
                                        setIsModalOpen(true);
                                    } catch (_) {
                                        console.warn('Invalid artifact data.');
                                    }
                                }
                            }}
                        >
                            {gallery.component}
                        </div>
                    </div>
                </div>
            </main>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedArtifact?.name || 'Artifact Details'}
            >
                <ArtifactDetail artifact={selectedArtifact} />
            </Modal>
        </div>
    );
}
