'use client';

import GalleryCardInfo from './GalleryCardInfo';

export default function GalleryListSection({ galleries, hasTicket, onGallerySelect }) {
  const filteredGalleries = galleries.filter(
    (gallery) => typeof gallery.position === 'string' && gallery.position.trim() !== ''
  );

  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-[#111827] dark:text-white transition-colors duration-300">
      {filteredGalleries.map((gallery) => (
        <GalleryCardInfo
          key={gallery._id}
          gallery={gallery}
          hasTicket={hasTicket}
          onSelect={onGallerySelect}
        />
      ))}
    </div>
  );
}
