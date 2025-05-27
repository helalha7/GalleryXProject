'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/shared/Header';
import AnimatedBackdrop from '@/components/shared/AnimatedBackdrop';
import SectionHeader from '@/components/shared/SectionHeader';
import GALLERIES from '@/data/galleries';
import GalleryListSection from '@/components/explore/GalleryListSection';
import MuseumMapSection from '@/components/explore/MuseumMapSection';
import CallToAction from '@/components/explore/CallToAction';
import TicketBanner from '@/components/explore/TicketBanner';
import TicketPrompt from '@/components/explore/TicketPrompt';

export default function ExplorePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasTicket, setHasTicket] = useState(false);
  const [ticketRequired, setTicketRequired] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = sessionStorage.getItem('user');
      if (!storedUser) {
        router.push('/login?redirect=/explore');
        return;
      }
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setHasTicket(parsedUser.role === 'admin' || parsedUser.hasPurchasedTicket === true);
      } catch (e) {
        console.error('Error parsing user from session:', e);
      }
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
          <SectionHeader title="Museum Floor Plan" />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed text-center mb-12">
            Navigate through our virtual galleries and discover masterpieces from around the world
          </p>

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
