'use client';

import { useState } from 'react';
import InteractiveGallery from './InteractiveGallery';
import Modal from '../shared/Modal';
import ArtifactDetail from '../artifact/ArtifactDetail';
import { ROMAN_GALLERY_ARTIFACTS } from '@/data/artifacts';

export default function RomanGallery() {
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Handle artifact selection
  const handleArtifactClick = (artifact) => {
    setSelectedArtifact(artifact);
    setIsModalOpen(true);
  };
  
  return (
    <div className="w-full">
      <InteractiveGallery 
        galleryImage="/images/roman.jpg" 
        artifacts={ROMAN_GALLERY_ARTIFACTS}
      />
      
      <div className="mt-4 text-center text-gray-600">
        
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