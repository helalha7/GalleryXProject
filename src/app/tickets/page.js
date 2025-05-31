'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/shared/Header';
import TicketForm from '@/components/tickets/TicketForm';
import TicketSuccess from '@/components/tickets/TicketSuccess';
import {
  getUserFromSession,
  saveUserSession,
  getTokenFromSession,
} from '@/utils/sessionStorageHandler';
import { fetchUserTicket } from '@/lib/api/ticket'; // updated path
import AnimatedBackdrop from '@/components/shared/AnimatedBackdrop';

export default function TicketPage() {
  const [user, setUser] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const storedUser = getUserFromSession();
      const storedToken = getTokenFromSession();

      if (!storedUser || !storedToken) {
        router.push('/login?redirect=/tickets');
        return;
      }

      setUser(storedUser);
      setToken(storedToken);

      try {
        const ticket = await fetchUserTicket(storedToken);
        const validUntil = new Date(ticket.validUntil);
        const now = new Date();

        if (validUntil > now) {
          setTicket(ticket);
        }
      } catch (err) {
        console.warn('No valid ticket found:', err.message);
      }
    };

    init();
  }, [router]);

  const handlePurchase = (newTicket) => {
    const updatedUser = { ...user, ticket: newTicket.id };
    setUser(updatedUser);
    setTicket(newTicket);
    saveUserSession(updatedUser, token);
  };

  return (
    <>
      <Header user={user} />
      <AnimatedBackdrop/>
      <main className="flex-1 flex justify-center items-center p-6">
        {!ticket ? (
          <TicketForm onSuccess={handlePurchase} />
        ) : (
          <TicketSuccess ticket={ticket} />
        )}
      </main>
    </>
  );
}
