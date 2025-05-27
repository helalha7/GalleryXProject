'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Modal from '../shared/Modal';
import ArtifactDetail from '../artifact/ArtifactDetail';

export default function InteractiveGallery({ galleryImage, artifacts }) {
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // Handle window resize to maintain coordinate mapping
  useEffect(() => {
    function handleResize() {
      const container = document.getElementById('gallery-container');
      if (container) {
        setDimensions({
          width: container.clientWidth,
          height: container.clientHeight
        });
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded]);

  const handleArtifactClick = (artifact) => {
    setSelectedArtifact(artifact);
    setIsModalOpen(true);
  };

  // Calculate position for hotspots based on original and current dimensions
  const calculatePosition = (coords, originalWidth = 1000, originalHeight = 600) => {
    const { width, height } = dimensions;
    const widthRatio = width / originalWidth;
    const heightRatio = height / originalHeight;
    
    return {
      left: `${coords.x * widthRatio}px`,
      top: `${coords.y * heightRatio}px`,
      width: `${coords.width * widthRatio}px`,
      height: `${coords.height * heightRatio}px`
    };
  };

  return (
    <div className="w-full">
      <div 
        id="gallery-container" 
        className="relative w-full max-w-full overflow-hidden bg-gray-100 border border-white rounded-lg"
        style={{ height: '500px' }}
      >
        {/* Gallery Image */}
        <Image
          src={galleryImage}
          alt="Art Gallery"
          fill
          className="object-contain"
          onLoadingComplete={() => setIsLoaded(true)}
          onError={() => console.error(`Failed to load image: ${galleryImage}`)}
          priority
        />
        
        {/* Display a fallback message if image doesn't load */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <p className="text-gray-600">Gallery image loading...</p>
          </div>
        )}

        {/* Artifact Hotspots */}
        {isLoaded && artifacts.map((artifact, index) => (
          <div
            key={artifact._id || index}
            className="absolute cursor-pointer hover:bg-white hover:bg-opacity-20 transition-all duration-200 rounded-md border-2 border-transparent hover:border-white"
            style={calculatePosition(artifact.coords)}
            onClick={() => handleArtifactClick(artifact)}
            title={artifact.name}
          >
            {/* Optional visual indicator */}
            <div className="absolute bottom-2 right-2 w-4 h-4 bg-white rounded-full opacity-0 hover:opacity-70" />
          </div>
        ))}
      </div>

      {/* Information text */}
      <div className="mt-4 text-center text-gray-600">
        <p>Click on any artifact in the gallery to view details</p>
      </div>

      {/* Artifact Detail Modal */}
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