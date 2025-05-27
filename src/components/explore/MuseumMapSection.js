'use client';

import FixedMuseumMap from '../map/FixedMuseumMap';
import SectionHeader from '../shared/SectionHeader';

export default function MuseumMapSection({ hasTicket, onGallerySelect }) {
  return (
    <div className="bg-gradient-to-b from-gray-700/30 to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-600/30 p-8 shadow-2xl">
      <div className="mb-6 text-center">
        <SectionHeader title="Interactive Floor Plan" noDivider />
        <p className="text-gray-400">Click on any gallery to begin your virtual tour</p>
      </div>

      <FixedMuseumMap onGallerySelect={onGallerySelect} />
    </div>
  );
}
