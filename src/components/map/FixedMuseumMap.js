'use client';

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAllGalleries } from '@/lib/api/gallery';
import LoadingSpinner from '../shared/LoadingSpinner';
import GalleryCard from './GalleryCard';
import RoomCard from './RoomCard'; // Make sure this path is correct
import { roomInfoMap } from '@/data/rooms'; // Import room data

export default function FixedMuseumMap({ onGallerySelect }) {
  const router = useRouter();
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const [dims, setDims] = useState({ width: 0, height: 0 });

  const original = { width: 1182, height: 710 };

  useEffect(() => {
    fetchAllGalleries()
      .then(setGalleries)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const updateDims = () => {
    if (containerRef.current) {
      setDims({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  };

  useEffect(() => {
    updateDims();
    window.addEventListener('resize', updateDims);
    return () => window.removeEventListener('resize', updateDims);
  }, []);

  const handleImageLoad = () => {
    updateDims();
  };

  const handleClick = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    console.log(`Clicked at X: ${x}, Y: ${y}`);
  };

  const getPos = (coords) => {
    const scale = dims.width / original.width;
    const width = (coords.w || 300) * scale;
    const height = (coords.h || 220) * scale;

    return {
      position: 'absolute',
      left: `${coords.x * scale}px`,
      top: `${coords.y * scale}px`,
      width: `${width}px`,
      height: `${height}px`,
      zIndex: 10,
    };
  };


  const coordsMap = {
    'gallery 1': { x: 7, y: 12 },
    'gallery 2': { x: 7, y: 245 },
    'gallery 3': { x: 7, y: 482 },
    'gallery 4': { x: 867, y: 245 },
    'gallery 5': { x: 867, y: 482 },
    'store': { x: 800, y: 280, w: 250, h: 180 },
    'bathroom': { x: 315, y: 15, w: 165, h: 60 },
    'cinema': { x: 420, y: 350, w: 370, h: 150 },
    'restaurant': { x: 485, y: 12, w: 690, h: 220 },
    'help desk': { x: 615, y: 575, w: 100, h: 140 },
  };


  if (loading) return <LoadingSpinner message="Loading museum map..." />;

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-6xl mx-auto aspect-[1182/710]"
      onClick={handleClick}
    >
      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black/50 pointer-events-none transition-colors duration-300 rounded-xl" />

      {/* Background Image */}
      <Image
        src="/images/museum_Map.png"
        alt="Museum Map"
        fill
        className="object-fill rounded-xl border shadow"
        priority
        onLoad={handleImageLoad}
      />

      {/* Gallery cards */}
      {dims.width > 0 &&
        galleries.map((gallery) => {
          const pos = coordsMap[gallery.position?.toLowerCase()];
          if (!pos) return null;

          return (
            <div key={gallery._id} style={getPos(pos)}>
              <GalleryCard
                gallery={gallery}
                onClick={() => router.push(`/explore/gallery/${gallery._id}`)}
              />
            </div>
          );
        })}

      {/* Room cards */}
      {dims.width > 0 &&
        Object.entries(roomInfoMap).map(([roomId, room]) => {
          const pos = coordsMap[roomId.toLowerCase()];
          if (!pos) return null;

          return (
            <div key={roomId} style={getPos(pos)}>
              <RoomCard
                room={room}
                onClick={() => router.push(`/rooms/${roomId}`)}
              />
            </div>
          );
        })}
    </div>
  );
}
