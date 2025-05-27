'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/shared/Header';
import TicketPurchase from '../../components/ticket/TicketPurchase';

export default function TicketsPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    // Check if user is logged in
    const storedUser = sessionStorage.getItem('user');
    if (!storedUser) {
      router.push('/login?redirect=/tickets');
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [router]);

  // Handle ticket purchase completion
  const handlePurchaseComplete = () => {
    router.push('/explore');
  };
  
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-6">
          <p>Loading...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} />
      
      <main className="flex-1 flex items-center justify-center p-6 bg-gray-50 dark:bg-white">
        <TicketPurchase onComplete={handlePurchaseComplete} />
      </main>
    </div>
  );
}