'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function ArtifactDetail({ artifact }) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  const safeArtifact = artifact || {};
  const getValue = (field, defaultValue = '') => {
    if (safeArtifact[field] === undefined || safeArtifact[field] === null) return defaultValue;
    return typeof safeArtifact[field] === 'object' ? defaultValue : String(safeArtifact[field]);
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  if (!artifact) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        Loading artifact details...
      </div>
    );
  }

  const imageUrl = getValue('imageUrl', '/images/placeholder.jpg');
  const audioUrl = getValue('audioUrl', '/audio/placeholder.mp3');
  const name = getValue('name', 'Unnamed Artifact');
  const artist = getValue('artist');
  const createdYear = getValue('createdYear');
  const description = getValue('description', 'No description available.');
  const additionalInfo = getValue('additionalInfo');

  return (
    <div className="flex flex-col md:flex-row bg-[#f9fafb] dark:bg-gray-900 text-[#111827] dark:text-white transition-colors duration-300 rounded-lg overflow-hidden">
      <div className="md:w-1/2 p-4">
        <div className="relative w-full h-[500px] bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      <div className="md:w-1/2 p-6">
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">About this Artifact</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{description}</p>
        </div>

        {audioUrl && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Audio Explanation</h3>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <audio
                ref={audioRef}
                src={audioUrl}
                onEnded={() => setIsAudioPlaying(false)}
                className="w-full"
                controls
              />
            </div>
          </div>
        )}

        {additionalInfo && (
          <div>
            <h3 className="text-xl font-semibold mb-2">Additional Information</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{additionalInfo}</p>
          </div>
        )}
      </div>
    </div>
  );
}
