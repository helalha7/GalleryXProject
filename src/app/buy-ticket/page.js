'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchUserTicket } from '@/lib/api/ticket';
import BuyTicketButton from '@/components/ticket/BuyTicketButton';
import { getTokenFromSession, getUserFromSession } from '@/utils/sessionStorageHandler';

export default function BuyTicketPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const user = getUserFromSession();
  const token = getTokenFromSession();

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    const getTicket = async () => {
      try {
        const ticket = await fetchUserTicket(token);
        if (ticket) {
          router.push('/my-ticket'); // ✅ Redirect instead of showing TicketInfo
          return;
        }
      } catch (err) {
        // No ticket found, proceed to render BuyTicketButton
      } finally {
        setLoading(false);
      }
    };

    getTicket();
  }, [token, router]);

  if (loading) return <div className="p-8 text-center text-lg">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-primary dark:text-white">Buy Your Museum Ticket</h1>
      <BuyTicketButton token={token} onPurchase={() => router.push('/my-ticket')} />
    </div>
  );
}
