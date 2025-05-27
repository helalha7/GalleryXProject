'use client';

import { useState } from 'react';
import InteractiveGallery from './InteractiveGallery';
import Modal from '../shared/Modal';
import ArtifactDetail from '../artifact/ArtifactDetail';
import { MONA_LISA_GALLERY_ARTIFACTS } from '@/data/artifacts'; 

export default function MonaLisaGallery() {
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
        galleryImage="/images/munalisa.jpg" 
        artifacts={MONA_LISA_GALLERY_ARTIFACTS}
      />
      
      <div className="mt-4 text-center text-gray-600">
        
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