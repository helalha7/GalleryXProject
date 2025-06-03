'use client';

import { useRouter } from 'next/navigation';
import GALLERIES from '@/data/galleries';
import GalleryListSection from '@/components/explore/GalleryListSection';
import MuseumMapSection from '@/components/explore/MuseumMapSection';
import CallToAction from '@/components/explore/CallToAction';
import TicketBanner from '@/components/explore/TicketBanner';
import useRequireTicket from '@/hooks/guards/useRequireTicket';

export default function ExplorePage() {
  const router = useRouter();
  const { hasValidTicket, loading } = useRequireTicket();

  const handleGallerySelect = (gallery) => {

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-black dark:text-white">Checking ticket status...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {!hasValidTicket && <TicketBanner />}
      <MuseumMapSection hasTicket={hasValidTicket} onGallerySelect={handleGallerySelect} />
      <GalleryListSection
        galleries={GALLERIES}
        hasTicket={hasValidTicket}
        onGallerySelect={handleGallerySelect}
      />
      <CallToAction hasTicket={hasValidTicket} />
    </div>
  );
}
