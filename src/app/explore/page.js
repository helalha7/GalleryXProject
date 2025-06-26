'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAllGalleries } from '@/lib/api/gallery';

import GalleryListSection from '@/components/explore/GalleryListSection';
import MuseumMapSection from '@/components/explore/MuseumMapSection';
import CallToAction from '@/components/explore/CallToAction';
import TicketBanner from '@/components/explore/TicketBanner';
import useRequireTicket from '@/hooks/guards/useRequireTicket';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function ExplorePage() {
  const router = useRouter();
  const { hasValidTicket, loading: ticketLoading } = useRequireTicket();

  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllGalleries()
      .then(setGalleries)
      .catch((err) => {
        console.error('Failed to load galleries:', err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleGallerySelect = (gallery) => {
    if (!gallery?._id) return;

    router.push(`/explore/gallery/${gallery._id}`);
  };


  if (loading || ticketLoading) {
    return <LoadingSpinner message="Loading explore page..." />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      {!hasValidTicket && <TicketBanner />}
      <MuseumMapSection hasTicket={hasValidTicket} onGallerySelect={handleGallerySelect} />
      <GalleryListSection
        galleries={galleries}
        hasTicket={hasValidTicket}
        onGallerySelect={handleGallerySelect}
      />
      <CallToAction hasTicket={hasValidTicket} />
    </div>
  );
}
