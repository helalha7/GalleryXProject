'use client';

import { useState } from 'react';
import { purchaseTicket } from '@/lib/api/ticket';
import { updateUserTicketInSession } from '@/utils/sessionStorageHandler';

export default function BuyTicketButton({ token, onPurchase }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePurchase = async () => {
    setLoading(true);
    setError('');

    try {
      const ticket = await purchaseTicket(token);

      // ✅ Update sessionStorage with ticket
      updateUserTicketInSession(ticket);

      // ✅ Notify parent
      onPurchase(ticket);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handlePurchase}
        disabled={loading}
        className="btn-accent disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing...' : 'Buy Ticket'}
      </button>
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}
