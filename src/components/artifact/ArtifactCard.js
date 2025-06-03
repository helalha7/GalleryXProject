'use client';

import Image from 'next/image';

export default function ArtifactCard({ artifact, onClick }) {
  const safeArtifact = artifact || {};
  const imageUrl = safeArtifact.imageUrl || '/images/placeholder.jpg';

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
      className="gallery-item bg-white dark:bg-primary cursor-pointer transition-all duration-300 rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-900/20 hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="relative h-40 w-full overflow-hidden rounded-t-xl">
        <Image
          src={imageUrl}
          alt={getName()}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white">
          {getName()}
        </h3>
        {safeArtifact.artist && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {getArtist()}{getYear() && `, ${getYear()}`}
          </p>
        )}
      </div>
    </div>
  );
}
