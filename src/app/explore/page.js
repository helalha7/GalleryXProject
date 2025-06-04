'use client';

import { useRouter } from 'next/navigation';
import GALLERIES from '@/data/galleries';
import GalleryListSection from '@/components/explore/GalleryListSection';
import MuseumMapSection from '@/components/explore/MuseumMapSection';
import CallToAction from '@/components/explore/CallToAction';
import TicketBanner from '@/components/explore/TicketBanner';
import useRequireTicket from '@/hooks/guards/useRequireTicket';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

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
     <LoadingSpinner message = {'checking ticket status ...'}/>
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
