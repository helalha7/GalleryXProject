'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function ArtifactDetail({ artifact }) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef(null);
  
  // Ensure we're working with a valid artifact object
  const safeArtifact = artifact || {};
  
  // Safely get text values
  const getValue = (field, defaultValue = '') => {
    if (safeArtifact[field] === undefined || safeArtifact[field] === null) return defaultValue;
    return typeof safeArtifact[field] === 'object' ? defaultValue : String(safeArtifact[field]);
  };
  
  // Audio player controls
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
  
  // Clean up audio when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);
  
  if (!artifact) return <div className="p-6 text-center text-gray-500">Loading artifact details...</div>;

  // Handle missing image URL
  const imageUrl = getValue('imageUrl', '/images/placeholder.jpg');
  const audioUrl = getValue('audioUrl', '/audio/placeholder.mp3');
  const name = getValue('name', 'Unnamed Artifact');
  const artist = getValue('artist');
  const createdYear = getValue('createdYear');
  const description = getValue('description', 'No description available.');
  const additionalInfo = getValue('additionalInfo');

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 p-4">
        <div className="relative w-full h-[500px] bg-gray-100 overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
      
      <div className="md:w-1/2 p-6 text-black">
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">About this Artifact</h3>
          <p className="text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>
        
        {audioUrl && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Audio Explanation</h3>
            <div className="bg-gray-100 rounded-lg p-4">
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
            <p className="text-gray-600 leading-relaxed">
              {additionalInfo}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}