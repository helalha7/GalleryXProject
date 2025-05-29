'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/shared/Header';
import AnimatedBackdrop from '@/components/shared/AnimatedBackdrop';
import GALLERIES from '@/data/galleries';
import GalleryListSection from '@/components/explore/GalleryListSection';
import MuseumMapSection from '@/components/explore/MuseumMapSection';
import CallToAction from '@/components/explore/CallToAction';
import TicketBanner from '@/components/explore/TicketBanner';
import TicketPrompt from '@/components/explore/TicketPrompt';
import { getUserFromSession } from '@/utils/sessionStorageHandler';

export default function ExplorePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasTicket, setHasTicket] = useState(false);
  const [ticketRequired, setTicketRequired] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = getUserFromSession();
      if (!storedUser) {
        router.push('/login?redirect=/explore');
        return;
      }

      setUser(storedUser);
      setHasTicket(storedUser.role === 'admin' || !!storedUser.ticket);
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleGallerySelect = (gallery) => {
    if (!hasTicket) return setTicketRequired(true);

    const galleryId = gallery?._id || 'unknown-gallery';
    if (galleryId === 'gallery-a') router.push('/explore/egyptian-gallery');
    else if (galleryId === 'roman-gallery') router.push('/explore/roman-gallery');
    else if (galleryId === 'mona-lisa-gallery') router.push('/explore/mona-lisa-gallery');
    else router.push(`/explore/gallery/${galleryId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-900 relative overflow-hidden">
        <div className="relative z-50">
          <Header user={user} />
        </div>
        <AnimatedBackdrop />
        <main className="flex-1 p-6 flex items-center justify-center relative z-10">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 font-medium">Preparing your virtual museum experience...</p>
          </div>
        </main>
      </div>
    );
  }

  if (ticketRequired) {
    return <TicketPrompt onBack={() => setTicketRequired(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 relative">
      <div className="relative z-50">
        <Header user={user} />
      </div>
      <AnimatedBackdrop />
      <main className="flex-1 p-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {!hasTicket && <TicketBanner />}
          <MuseumMapSection
            hasTicket={hasTicket}
            onGallerySelect={handleGallerySelect}
          />
          <GalleryListSection
            galleries={GALLERIES}
            hasTicket={hasTicket}
            onGallerySelect={handleGallerySelect}
          />
          <CallToAction hasTicket={hasTicket} />
        </div>
      </main>
    </div>
  );
}
