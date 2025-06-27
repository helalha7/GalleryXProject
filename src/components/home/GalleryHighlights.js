'use client';

import { useEffect, useState } from 'react';
import { fetchAllGalleries } from '@/lib/api/gallery';

import SectionHeader from '../shared/SectionHeader';
import GalleryHighlight from './GalleryHighlight';
import LoadingSpinner from '../shared/LoadingSpinner';

export default function GalleryHighlights() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllGalleries()
      .then(setGalleries)
      .catch((err) => {
        console.error('Failed to load galleries:', err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner message="Loading gallery highlights..." />;

  const galleriesWithPosition = galleries.filter(
    (gallery) => gallery.position?.trim()
  );

  return (
    <section className="py-20 bg-[#f9fafb] text-[#111827] dark:bg-gray-900 dark:text-white transition-colors duration-300 relative">
      <div className="hidden dark:block absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 pointer-events-none z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader title="Gallery Highlights" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {galleriesWithPosition.map((gallery, index) => (
            <GalleryHighlight key={gallery._id} gallery={gallery} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
