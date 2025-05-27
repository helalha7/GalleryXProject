'use client';

import { useRouter } from 'next/navigation';
import GalleryCard from './GalleryCard';
import GALLERIES from '@/data/galleries';

export default function FixedMuseumMap({ onGallerySelect }) {
  const router = useRouter();

  const handleGalleryClick = (gallery) => {
    if (onGallerySelect) {
      onGallerySelect(gallery);
    } else {
      switch (gallery._id) {
        case 'gallery-a':
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

  return (
    <section className="p-8 bg-gray-900 rounded-2xl shadow-xl border border-gray-700 max-w-4xl mx-auto select-none">
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-display font-extrabold text-white tracking-tight mb-1">
          GalleryX - Museum Map
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          Click on a gallery to explore
        </p>
      </header>

      <div className="grid gap-8 max-w-3xl mx-auto grid-cols-1 sm:grid-cols-2">
        {GALLERIES.map((gallery) => (
          <GalleryCard
            key={gallery._id}
            gallery={gallery}
            onClick={handleGalleryClick}
          />
        ))}
      </div>
    </section>
  );
}
