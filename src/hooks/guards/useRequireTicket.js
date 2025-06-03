// hooks/guards/useRequireTicket.js
'use client';

import { useEffect, useState } from 'react';
import { getTokenFromSession } from '@/utils/sessionStorageHandler';
import { fetchUserTicket } from '@/lib/api/ticket';

export default function useRequireTicket() {
  const [loading, setLoading] = useState(true);
  const [hasValidTicket, setHasValidTicket] = useState(false);

  useEffect(() => {
    const checkTicket = async () => {
      const token = getTokenFromSession();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const ticket = await fetchUserTicket(token);
        const isValid = new Date(ticket.validUntil) > new Date();
        setHasValidTicket(isValid);
      } catch {
        setHasValidTicket(false);
      } finally {
        setLoading(false);
      }
    };

    checkTicket();
  }, []);

  return { hasValidTicket, loading };
}
