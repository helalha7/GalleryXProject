'use client';

import GalleryCardInfo from './GalleryCardInfo';

export default function GalleryListSection({ galleries, hasTicket, onGallerySelect }) {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      {galleries.map((gallery) => (
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
