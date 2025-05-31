'use client';

import FixedMuseumMap from '../map/FixedMuseumMap';
import SectionHeader from '../shared/SectionHeader';

export default function MuseumMapSection({ hasTicket, onGallerySelect }) {
  return (
    <>
      <SectionHeader title="Museum Floor Plan" />
      <p className="text-xl text-[#374151] dark:text-gray-300 max-w-2xl mx-auto leading-relaxed text-center mb-12 transition-colors duration-300">
        Navigate through our virtual galleries and discover masterpieces from around the world
      </p>
      <FixedMuseumMap onGallerySelect={onGallerySelect} />
    </>
  );
}
