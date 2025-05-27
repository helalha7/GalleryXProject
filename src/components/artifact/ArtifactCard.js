'use client';

import Image from 'next/image';

export default function ArtifactCard({ artifact, onClick }) {
  // Ensure we're working with a valid artifact object
  const safeArtifact = artifact || {};
  
  // Handle missing image URL
  const imageUrl = safeArtifact.imageUrl || '/images/placeholder.jpg';
  
  // Safely get text values
  const getName = () => {
    if (!safeArtifact.name) return 'Unnamed Artifact';
    return typeof safeArtifact.name === 'object' ? 'Artifact' : String(safeArtifact.name);
  };
  
  const getArtist = () => {
    if (!safeArtifact.artist) return '';
    return typeof safeArtifact.artist === 'object' ? 'Unknown Artist' : String(safeArtifact.artist);
  };
  
  const getYear = () => {
    if (!safeArtifact.createdYear) return '';
    return typeof safeArtifact.createdYear === 'object' ? '' : String(safeArtifact.createdYear);
  };

  return (
    <div 
      className="gallery-item bg-black cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 hover:translate-y-[-2px]"
      onClick={onClick}
    >
      <div className="relative h-40 w-full overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <Image
            src={imageUrl}
            alt={getName()}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="text-lg font-display font-semibold text-white">{getName()}</h3>
        {safeArtifact.artist && (
          <p className="text-gray-400 text-sm">
            {getArtist()}{getYear() && `, ${getYear()}`}
          </p>
        )}
      </div>
    </div>
  );
}