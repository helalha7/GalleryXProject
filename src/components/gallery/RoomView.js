'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function RoomView({ gallery, artifacts, onArtifactClick }) {
  const [hoveredArtifact, setHoveredArtifact] = useState(null);

  // Define wall colors based on gallery
  const getWallColor = (galleryName) => {
    const colors = {
      'Ancient Art': 'bg-amber-50',
      'Modern Masterpieces': 'bg-pink-50',
      'Special Exhibitions': 'bg-emerald-50',
      'Contemporary Art': 'bg-sky-50',
    };
    
    return colors[galleryName] || 'bg-gray-100';
  };

  // Wall color for dark mode
  const getDarkWallColor = (galleryName) => {
    const colors = {
      'Ancient Art': 'bg-amber-950',
      'Modern Masterpieces': 'bg-pink-950',
      'Special Exhibitions': 'bg-emerald-950',
      'Contemporary Art': 'bg-sky-950',
    };
    
    return colors[galleryName] || 'bg-gray-900';
  };

  // Get floor color based on gallery
  const getFloorColor = (galleryName) => {
    const colors = {
      'Ancient Art': 'bg-amber-100',
      'Modern Masterpieces': 'bg-pink-100',
      'Special Exhibitions': 'bg-emerald-100',
      'Contemporary Art': 'bg-sky-100',
    };
    
    return colors[galleryName] || 'bg-gray-200';
  };

  // Dark mode floor color
  const getDarkFloorColor = (galleryName) => {
    const colors = {
      'Ancient Art': 'bg-amber-900',
      'Modern Masterpieces': 'bg-pink-900',
      'Special Exhibitions': 'bg-emerald-900',
      'Contemporary Art': 'bg-sky-900',
    };
    
    return colors[galleryName] || 'bg-gray-800';
  };

  // Calculate positions for artifacts in the room
  const getArtifactPositions = (count) => {
    // Predefined positions for different numbers of artifacts
    const positions = {
      1: [{ left: '50%', top: '50%' }],
      2: [
        { left: '30%', top: '50%' },
        { left: '70%', top: '50%' }
      ],
      3: [
        { left: '20%', top: '30%' },
        { left: '50%', top: '65%' },
        { left: '80%', top: '30%' }
      ],
      4: [
        { left: '20%', top: '30%' },
        { left: '20%', top: '70%' },
        { left: '80%', top: '30%' },
        { left: '80%', top: '70%' }
      ],
      5: [
        { left: '20%', top: '30%' },
        { left: '20%', top: '70%' },
        { left: '50%', top: '50%' },
        { left: '80%', top: '30%' },
        { left: '80%', top: '70%' }
      ],
      6: [
        { left: '20%', top: '25%' },
        { left: '20%', top: '75%' },
        { left: '50%', top: '25%' },
        { left: '50%', top: '75%' },
        { left: '80%', top: '25%' },
        { left: '80%', top: '75%' }
      ]
    };

    // Return positions for the given count, or default to 6 positions
    return positions[Math.min(count, 6)] || positions[6];
  };

  const wallColor = getWallColor(gallery?.name);
  const darkWallColor = getDarkWallColor(gallery?.name);
  const floorColor = getFloorColor(gallery?.name);
  const darkFloorColor = getDarkFloorColor(gallery?.name);
  
  // Get positions for artifacts
  const positions = getArtifactPositions(artifacts.length);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-md">
      {/* Room walls */}
      <div className={`absolute inset-0 ${wallColor} dark:${darkWallColor} transition-colors duration-500`}>
        {/* Room floor */}
        <div className={`absolute bottom-0 left-0 right-0 h-1/4 ${floorColor} dark:${darkFloorColor} transition-colors duration-500`}></div>
        
        {/* Room ceiling line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-300 dark:bg-gray-700"></div>
        
        {/* Left wall line */}
        <div className="absolute top-0 bottom-0 left-0 w-1 bg-gray-300 dark:bg-gray-700"></div>
        
        {/* Right wall line */}
        <div className="absolute top-0 bottom-0 right-0 w-1 bg-gray-300 dark:bg-gray-700"></div>
        
        {/* Floor line */}
        <div className="absolute bottom-[25%] left-0 right-0 h-1 bg-gray-300 dark:bg-gray-700"></div>
        
        {/* Gallery name sign */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-6 py-2 rounded-md shadow-lg border border-gray-300 dark:border-gray-600">
          <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white">
            {gallery?.name || 'Gallery'}
          </h3>
        </div>
        
        {/* Artifacts on the walls */}
        {artifacts.map((artifact, index) => {
          const position = positions[index] || { left: '50%', top: '50%' };
          
          return (
            <div
              key={artifact._id || `artifact-${index}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-10"
              style={{ 
                left: position.left, 
                top: position.top,
              }}
              onMouseEnter={() => setHoveredArtifact(artifact._id)}
              onMouseLeave={() => setHoveredArtifact(null)}
              onClick={() => onArtifactClick(artifact)}
            >
              {/* Artifact frame */}
              <div 
                className={`
                  relative rounded-lg overflow-hidden border-4 
                  ${hoveredArtifact === artifact._id 
                    ? 'border-yellow-400 dark:border-yellow-500 scale-110 shadow-xl' 
                    : 'border-gray-300 dark:border-gray-700 shadow-md'}
                  transition-all duration-300 cursor-pointer
                  hover:shadow-xl
                `}
              >
                {/* Artifact image */}
                <div className="w-28 h-28 md:w-36 md:h-36 relative bg-black">
                  <Image
                    src={artifact.imageUrl || '/images/placeholder.jpg'}
                    alt={artifact.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 112px, 144px"
                  />
                </div>
                
                {/* Artifact name label (visible on hover) */}
                {hoveredArtifact === artifact._id && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2">
                    <p className="text-white text-xs text-center font-medium truncate">
                      {artifact.name}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}