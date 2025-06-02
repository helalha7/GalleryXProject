'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import GALLERIES from '@/data/galleries';
import GalleryListSection from '@/components/explore/GalleryListSection';
import MuseumMapSection from '@/components/explore/MuseumMapSection';
import CallToAction from '@/components/explore/CallToAction';
import TicketBanner from '@/components/explore/TicketBanner';
import TicketPrompt from '@/components/explore/TicketPrompt';
import { getUserFromSession } from '@/utils/sessionStorageHandler';

export default function ExplorePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [ticketRequired, setTicketRequired] = useState(false);

  useEffect(() => {
    const storedUser = getUserFromSession();
    setUser(storedUser || null);
  }, []);

  const hasTicket = user?.role === 'admin' || !!user?.ticket;

  const handleGallerySelect = (gallery) => {
    if (!hasTicket) return setTicketRequired(true);

    const galleryId = gallery?._id || 'unknown-gallery';
    switch (galleryId) {
      case 'gallery-a':
        router.push('/explore/gallery/egyptian-gallery');
        break;
      case 'roman-gallery':
        router.push('/explore/gallery/roman-gallery');
        break;
      case 'mona-lisa-gallery':
        router.push('/explore/gallery/mona-lisa-gallery');
        break;
      default:
        router.push(`/explore/gallery/${galleryId}`);
    }
  };

  if (ticketRequired) {
    return <TicketPrompt onBack={() => setTicketRequired(false)} />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      {!hasTicket && <TicketBanner />}
      <MuseumMapSection hasTicket={hasTicket} onGallerySelect={handleGallerySelect} />
      <GalleryListSection
        galleries={GALLERIES}
        hasTicket={hasTicket}
        onGallerySelect={handleGallerySelect}
      />
      <CallToAction hasTicket={hasTicket} />
    </div>
  );
}
