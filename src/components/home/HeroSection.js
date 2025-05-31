'use client';

import Image from 'next/image';
import GradientButtonLink from '../shared/buttons/GradientLinkButton';

export default function HeroSection() {
  return (
    <section className="relative bg-[#f9fafb] dark:bg-gray-900 text-[#111827] dark:text-white h-[80vh] flex items-center overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          {/* 🌞 Light mode overlay for text contrast */}
          <div className="block dark:hidden absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-white/80 z-10"></div>

          {/* 🌚 Dark mode overlay */}
          <div className="hidden dark:block absolute inset-0 bg-gradient-to-r from-blue-900/80 via-gray-900/60 to-blue-800/70 z-10"></div>

          {/* 🖼 Background image */}
          <Image
            src="/images/museum-hero.jpg"
            alt="Museum Gallery"
            fill
            className="object-cover z-0 dark:opacity-40"
            priority
          />
        </div>
      </div>

      <div className="relative z-20 container mx-auto px-6 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-400 dark:from-blue-400 dark:via-blue-500 dark:to-cyan-400 bg-clip-text text-transparent">
          DISCOVER WITH GALLERYX
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl text-[#374151] dark:text-gray-300 leading-relaxed">
          Immerse yourself in a world of art and culture through cutting-edge virtual experiences
        </p>
        <GradientButtonLink href="/explore">
          Begin Your Virtual Journey Today
        </GradientButtonLink>
      </div>
    </section>
  );
}
