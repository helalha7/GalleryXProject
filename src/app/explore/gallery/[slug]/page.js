'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Modal from '@/components/shared/Modal';
import ArtifactDetail from '@/components/artifact/ArtifactDetail';
import TicketPrompt from '@/components/explore/TicketPrompt';
import { galleryMap } from '@/data/galleryConfig';
import useRequireTicket from '@/hooks/guards/useRequireTicket';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import SectionHeader from '@/components/shared/SectionHeader';

export default function GalleryPage() {
    const { slug } = useParams();
    const router = useRouter();
    const gallery = galleryMap[slug];

    const { hasValidTicket, loading } = useRequireTicket();
    const [selectedArtifact, setSelectedArtifact] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (loading) return <LoadingSpinner />;

    if (!gallery) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] dark:bg-gray-900 px-4">
                <p className="text-lg text-red-600 dark:text-red-400">Gallery not found</p>
            </div>
        );
    }

    if (!hasValidTicket) {
        return <TicketPrompt onBack={() => router.push('/explore')} />;
    }

    return (
        <div className="min-h-screen bg-[#f9fafb] dark:bg-gray-900 text-[#111827] dark:text-white transition-colors duration-300">
            <main className="px-4 py-6 sm:px-6 lg:px-12 max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                    <SectionHeader title={gallery.title} />
                    <button
                        onClick={() => router.push('/explore')}
                        className="inline-flex items-center text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-1"
                        >
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                        Back to Museum Map
                    </button>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed max-w-3xl">
                    {gallery.description}
                </p>

                <div
                    className="rounded-2xl border bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-sm p-4 sm:p-6 transition"
                    onClick={(e) => {
                        if (slug === 'egyptian-gallery' && e.target.dataset.artifact) {
                            try {
                                const artifact = JSON.parse(e.target.dataset.artifact);
                                setSelectedArtifact(artifact);
                                setIsModalOpen(true);
                            } catch {
                                console.warn('Invalid artifact data.');
                            }
                        }
                    }}
                >
                    {gallery.component}
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
