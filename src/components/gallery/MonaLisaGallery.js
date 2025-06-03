'use client';

import { useState } from 'react';
import InteractiveGallery from './InteractiveGallery';
import Modal from '../shared/Modal';
import ArtifactDetail from '../artifact/ArtifactDetail';
import { MONA_LISA_GALLERY_ARTIFACTS } from '@/data/artifacts';

export default function MonaLisaGallery() {
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleArtifactClick = (artifact) => {
    setSelectedArtifact(artifact);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full bg-[#f9fafb] text-[#111827] dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <InteractiveGallery
        galleryImage="/images/munalisa.jpg"
        artifacts={MONA_LISA_GALLERY_ARTIFACTS}
        onArtifactClick={handleArtifactClick}
      />

      <div className="mt-6 text-center text-gray-600 dark:text-gray-300">
        {/* Optional subtitle or info */}
        <p className="text-sm italic">Explore the masterpiece of Leonardo da Vinci in an immersive experience.</p>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedArtifact?.name || 'Artwork Details'}
      >
        <ArtifactDetail artifact={selectedArtifact} />
      </Modal>
    </div>
  );
}
