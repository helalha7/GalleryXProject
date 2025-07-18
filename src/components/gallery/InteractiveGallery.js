'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Modal from '../shared/Modal';
import ArtifactDetail from '../artifact/ArtifactDetail';
import { incrementArtifactViewsByName } from '@/lib/api/artifact';
import { getTokenFromSession } from '@/utils/sessionStorageHandler';

export default function InteractiveGallery({ galleryImage, artifacts }) {
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const imageContainerRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      const container = imageContainerRef.current;
      if (container) {
        setDimensions({
          width: container.clientWidth,
          height: container.clientHeight,
        });
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleArtifactClick = async (artifact) => {
    setSelectedArtifact(artifact);
    setIsModalOpen(true);

    const token = getTokenFromSession();
    const viewedKey = `viewed:${artifact.name}`;

    try {
      if (artifact?.name && token && !sessionStorage.getItem(viewedKey)) {
        await incrementArtifactViewsByName(artifact.name, token);
        sessionStorage.setItem(viewedKey, 'true');
      }
    } catch (err) {
      console.error('Failed to increment artifact views:', err.message);
    }
  };

  const calculatePosition = (coords) => {
    const x = parseFloat(coords.x ?? 0);
    const y = parseFloat(coords.y ?? 0);
    const width = parseFloat(coords.width ?? 5); // default small % box
    const height = parseFloat(coords.height ?? 5);

    return {
      left: `${x}%`,
      top: `${y}%`,
      width: `${width}%`,
      height: `${height}%`,
    };
  };


  return (
    <div className="w-full">
      <div
        id="gallery-container"
        ref={imageContainerRef}
        className="relative w-full pt-[60%] overflow-hidden border rounded-xl shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
      >
        <Image
          src={galleryImage}
          alt="Art Gallery"
          fill
          className="object-fill"
          onError={() => console.error(`Failed to load image: ${galleryImage}`)}
          priority
        />

        {artifacts.map((artifact, index) => (
          <div
            key={artifact._id || index}
            className="absolute cursor-pointer transition-all duration-200 rounded-md border-2 border-transparent hover:border-white hover:bg-white/20 dark:hover:bg-white/10"
            style={calculatePosition(artifact.coords || {})}
            onClick={() => handleArtifactClick(artifact)}
            title={artifact.name}
          >
            <div className="absolute bottom-2 right-2 w-3 h-3 bg-white rounded-full opacity-0 hover:opacity-70 transition-opacity" />
          </div>
        ))}
      </div>

      <div className="mt-4 text-center text-gray-600 dark:text-gray-300">
        <p>Click on any artifact in the gallery to view details</p>
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
