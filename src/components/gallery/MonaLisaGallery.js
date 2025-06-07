'use client';

import { useState, useEffect } from 'react';
import InteractiveGallery from './InteractiveGallery';
import Modal from '../shared/Modal';
import ArtifactDetail from '../artifact/ArtifactDetail';
import { fetchArtifactsByGallery } from '@/lib/api/artifact';
import { getTokenFromSession } from '@/utils/sessionStorageHandler';

export default function MonaLisaGallery() {
  const [artifacts, setArtifacts] = useState([]);
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = getTokenFromSession();

  useEffect(() => {
    async function loadArtifacts() {
      try {
        setLoading(true);
        const data = await fetchArtifactsByGallery('Mona Lisa Gallery', token);
        setArtifacts(data);
      } catch (err) {
        setError(err.message || 'Failed to load artifacts.');
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      loadArtifacts();
    } else {
      setLoading(false);
      setError('You must be signed in with a valid ticket to view this gallery.');
    }
  }, [token]);

  const handleArtifactClick = (artifact) => {
    setSelectedArtifact(artifact);
    setIsModalOpen(true);
  };

  if (loading) {
    return <p className="text-center text-gray-600 mt-10">Loading artifacts...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <div className="w-full bg-[#f9fafb] text-[#111827] dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <InteractiveGallery
        galleryImage="/images/munalisa.jpg"
        artifacts={artifacts}
        onArtifactClick={handleArtifactClick}
      />

      <div className="mt-6 text-center text-gray-600 dark:text-gray-300">
        <p className="text-sm italic">
          Explore the masterpiece of Leonardo da Vinci in an immersive experience.
        </p>
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
