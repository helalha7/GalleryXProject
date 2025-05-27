'use client';

import { useState } from 'react';

export default function GalleryCard({ gallery, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      tabIndex={0}
      role="button"
      aria-pressed={isHovered}
      onClick={() => onClick(gallery)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className={`
        relative
        rounded-xl
        overflow-hidden
        cursor-pointer
        shadow-lg
        flex flex-col items-center justify-center
        text-center
        p-8
        transition
        duration-300
        transform
        hover:scale-[1.04]
        focus:outline-none
        focus:ring-4
        focus:ring-offset-2
        focus:ring-blue-500
        border-2 border-gray-700
        bg-cover bg-center
        min-h-[250px]
      `}
      style={{
        backgroundImage: `url(${gallery.image})`,
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Content */}
      <div className="relative z-10">
        <h3 className="font-display font-semibold mb-3 text-lg sm:text-xl text-white">
          {gallery.name}
        </h3>

        {isHovered ? (
          <>
            <p className="text-gray-300 mb-4 text-sm sm:text-base">
              {gallery.description}
            </p>
            <button
              className="px-6 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg hover:from-cyan-500 hover:to-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-cyan-400"
              aria-label={`Enter ${gallery.name}`}
              type="button"
            >
              Enter Gallery
            </button>
          </>
        ) : (
          <p className="italic text-gray-300 text-sm select-none pointer-events-none">
            Click to explore
          </p>
        )}
      </div>
    </div>
  );
}
