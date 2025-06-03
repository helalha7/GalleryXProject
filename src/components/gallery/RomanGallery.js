'use client';

import { useState } from 'react';
import InteractiveGallery from './InteractiveGallery';
import Modal from '../shared/Modal';
import ArtifactDetail from '../artifact/ArtifactDetail';
import { ROMAN_GALLERY_ARTIFACTS } from '@/data/artifacts';

export default function RomanGallery() {
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleArtifactClick = (artifact) => {
    setSelectedArtifact(artifact);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full bg-[#f9fafb] text-[#111827] dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <InteractiveGallery
        galleryImage="/images/roman.jpg"
        artifacts={ROMAN_GALLERY_ARTIFACTS}
        onArtifactClick={handleArtifactClick}
      />

      <div className="mt-6 text-center text-gray-600 dark:text-gray-300">
        {/* Optional subtitle */}
        <p className="text-sm italic">Step into the legacy of Roman artistry and craftsmanship.</p>
      </div>

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
