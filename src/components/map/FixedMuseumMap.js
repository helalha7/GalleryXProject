'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAllGalleries } from '@/lib/api/gallery';

import GalleryCard from './GalleryCard';
import GradientCard from '../shared/GradientCard';
import LoadingSpinner from '../shared/LoadingSpinner';

export default function FixedMuseumMap({ onGallerySelect }) {
  const router = useRouter();
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllGalleries()
      .then(setGalleries)
      .catch((err) => {
        console.error('Error fetching galleries:', err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleGalleryClick = (gallery) => {
    if (onGallerySelect) {
      onGallerySelect(gallery);
    } else {
      switch (gallery._id) {
        case 'egyptian-gallery':
          router.push('/explore/egyptian-gallery');
          break;
        case 'roman-gallery':
          router.push('/explore/roman-gallery');
          break;
        case 'mona-lisa-gallery':
          router.push('/explore/mona-lisa-gallery');
          break;
        default:
          router.push(`/explore/gallery/${gallery._id}`);
      }
    }
  };

  if (loading) return <LoadingSpinner message="Loading museum map..." />;

  return (
    <GradientCard
      hover={false}
      className="p-8 sm:p-12 lg:p-16 max-w-6xl mx-auto mt-12"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleries.map((gallery) => (
          <GalleryCard
            key={gallery._id}
            gallery={gallery}
            onClick={handleGalleryClick}
          />
        ))}
      </div>
    </GradientCard>
  );
}
