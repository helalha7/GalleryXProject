'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/shared/Header';
import Modal from '@/components/shared/Modal';
import ArtifactDetail from '@/components/artifact/ArtifactDetail';
import Link from 'next/link';
import { galleryMap } from '@/data/galleryConfig';
import useRequireAuth from '@/hooks/guards/useRequireAuth';

export default function GalleryPage() {
    const { slug } = useParams(); // ✅ fixes warning
    const router = useRouter();
    const gallery = galleryMap[slug];

    const { user, loading } = useRequireAuth(`/login?redirect=/explore/gallery/${slug}`);
    const [needsTicket, setNeedsTicket] = useState(false);
    const [selectedArtifact, setSelectedArtifact] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Auth & ticket check
    useEffect(() => {
        if (!user) return;
        const isAdmin = user.role === 'admin';
        const hasTicket = !!user.ticket;
        if (!isAdmin && !hasTicket) {
            setNeedsTicket(true);
        }
    }, [user]);

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg text-black">Loading gallery...</p>
            </div>
        );
    }

    // Invalid slug
    if (!gallery) {
        return <div className="p-6 text-red-600 text-center">Gallery not found</div>;
    }

    // Ticket required state
    if (needsTicket) {
        return (
            <div className="min-h-screen flex flex-col bg-white">
                <main className="flex-1 p-6 flex items-center justify-center">
                    <div className="text-center max-w-md p-8 bg-gray-200 rounded-lg shadow-md">
                        <h1 className="text-3xl font-display font-bold mb-4 text-black">Purchase a Ticket</h1>
                        <p className="mb-6 text-gray-600">You need a virtual tour pass to access this gallery.</p>
                        <Link href="/tickets" className="btn-primary py-3 px-6">Buy Ticket</Link>
                    </div>
                </main>
            </div>
        );
    }

    // Main render
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <main className="flex-1 p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-display font-bold text-black">{gallery.title}</h1>
                        <button
                            onClick={() => router.push('/explore')}
                            className="flex items-center text-blue-400 hover:text-blue-300"
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

                    <p className="text-gray-600 mb-8">{gallery.description}</p>

                    <div className="p-8 bg-gray-200 border border-white rounded-lg">
                        {/* Render interactive gallery with optional artifact click support */}
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
