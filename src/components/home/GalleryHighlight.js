// GalleryHighlight.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import GradientCard from '@/components/shared/GradientCard';
import GradientButtonLink from '../shared/buttons/GradientLinkButton';

export default function GalleryHighlight({ gallery, index }) {
  return (
    <GradientCard>
      <div className="relative h-64 w-full bg-gray-700 overflow-hidden">
        <Image
          src={gallery.image}
          alt={gallery.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
        <div className="absolute top-4 left-4 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
          {index + 1}
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-2xl font-display font-bold mb-3 text-white group-hover:text-blue-300 transition-colors duration-300">
          {gallery.name}
        </h3>
        <p className="text-gray-300 mb-6 leading-relaxed">{gallery.description}</p>
        <GradientButtonLink href = {`/explore/${gallery._id}`}>Explore Gallery</GradientButtonLink>
      </div>
    </GradientCard>
  );
}
