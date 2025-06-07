// hooks/guards/useRequireTicket.js
'use client';

import { useEffect, useState } from 'react';
import { getTokenFromSession } from '@/utils/sessionStorageHandler';
import { fetchUserTicket } from '@/lib/api/ticket';

export default function useRequireTicket() {
  const [loading, setLoading] = useState(true);
  const [ticket, setTicket] = useState(null);
  const [hasValidTicket, setHasValidTicket] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkTicket = async () => {
      const token = getTokenFromSession();
      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }

      try {
        const res = await fetchUserTicket(token);
        setTicket(res);

        const validUntil = new Date(res.validUntil);
        const isValid = validUntil > new Date();

        setHasValidTicket(isValid);
        if (!isValid) {
          setError('Your ticket has expired.');
        }
      } catch (err) {
        setError(err.message || 'Could not fetch ticket.');
        setHasValidTicket(false);
      } finally {
        setLoading(false);
      }
    };

    checkTicket();
  }, []);

  return { hasValidTicket, ticket, loading, error };
}
