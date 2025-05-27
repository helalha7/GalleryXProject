'use client';

import Image from 'next/image';
import Link from 'next/link';
import GradientButtonLink from '../shared/buttons/GradientLinkButton';

export default function HeroSection() {
  return (
    <section className="relative bg-gray-900 text-white h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-gray-900/60 to-blue-800/70 z-10"></div>
          <Image
            src="/images/museum-hero.jpg"
            alt="Museum Gallery"
            fill
            className="object-cover z-0 opacity-40"
            priority
          />
        </div>
      </div>

      <div className="relative z-20 container mx-auto px-6 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
          DISCOVER WITH GALLERYX
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl text-gray-300 leading-relaxed">
          Immerse yourself in a world of art and culture through cutting-edge virtual experiences
        </p>
        <GradientButtonLink href = '/explore'>
          Begin Your Virtual Journey Today
        </GradientButtonLink>
      </div>
    </section>
  );
}
