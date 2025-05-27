'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../../components/shared/Header';
import MonaLisaGallery from '../../../components/gallery/MonaLisaGallery';
import Link from 'next/link';

export default function MonaLisaGalleryPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [needsTicket, setNeedsTicket] = useState(false);
  
  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      // Check if user is logged in
      const storedUser = sessionStorage.getItem('user');
      if (!storedUser) {
        router.push('/login?redirect=/explore/mona-lisa-gallery');
        return;
      }

      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        
        // Check if user has a ticket or is an admin
        const hasTicket = parsedUser.hasPurchasedTicket === true;
        const isAdmin = parsedUser.role === 'admin';
        
        // If not admin and doesn't have ticket, show ticket purchase prompt
        if (!isAdmin && !hasTicket) {
          setNeedsTicket(true);
        }
        
      } catch (e) {
        console.error('Error parsing user from session:', e);
        router.push('/login');
        return;
      }

      setLoading(false);
    };
    
    checkAuth();
  }, [router]);
  
  // Handle navigation back to museum map
  const handleBackClick = () => {
    router.push('/explore');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header user={user} />
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-black">Loading gallery...</p>
          </div>
        </main>
      </div>
    );
  }
  
  // Show ticket purchase prompt if needed
  if (needsTicket) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header user={user} />
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center max-w-md p-8 bg-gray-200 rounded-lg shadow-md">
            <h1 className="text-3xl font-display font-bold mb-4 text-black">
              Purchase a Ticket
            </h1>
            <p className="mb-6 text-gray-600">
              You need a virtual tour pass to access the museum galleries.
            </p>
            <Link 
              href="/tickets" 
              className="btn-primary py-3 px-6"
            >
              Buy Ticket
            </Link>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header user={user} />
      
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-display font-bold text-black">
              Mona Lisa Gallery
            </h1>
            
            <button
              onClick={handleBackClick}
              className="flex items-center text-blue-400 hover:text-blue-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              Back to Museum Map
            </button>
          </div>
          
          <p className="text-gray-600 mb-8">
            Experience the world's most famous painting in an intimate viewing room. Discover the secrets behind Leonardo da Vinci's masterpiece.
          </p>
          
          <div className="p-8 bg-gray-200 border border-white rounded-lg">
            <MonaLisaGallery />
          </div>
        </div>
      </main>
    </div>
  );
}