'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  getUserFromSession,
  saveUserSession,
  getTokenFromSession,
} from '@/utils/sessionStorageHandler';
import {
  purchaseTicket,
  fetchUserTicket,
} from '@/lib/api/tickets'; // ✅ plural and updated path

export default function TicketPurchase() {
  const [formData, setFormData] = useState({
    nameOnCard: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState(null);
  const [user, setUser] = useState(null);
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
        const existingTicket = await fetchUserTicket(storedToken);

        if (new Date(existingTicket.validUntil) > new Date()) {
          setTicket(existingTicket);
        }
      } catch (err) {
        console.warn('No valid ticket found or error:', err.message);
      }
    };

    init();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const newTicket = await purchaseTicket(token);
      const updatedUser = { ...user, ticket: newTicket.id };
      saveUserSession(updatedUser, token);
      setUser(updatedUser);
      setTicket(newTicket);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <p className="text-white">Loading...</p>;
  }

  if (ticket) {
    return (
      <div className="max-w-md mx-auto bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded p-6">
        <h2 className="text-2xl font-bold mb-2">🎟️ Ticket Purchased</h2>
        <p className="mb-4">
          Valid until:{' '}
          <strong>{new Date(ticket.validUntil).toLocaleDateString()}</strong>
        </p>
        <button
          onClick={() => router.push('/explore')}
          className="btn-primary w-full py-3"
        >
          Start Tour
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded p-6">
      <h2 className="text-2xl font-bold mb-4">Purchase Ticket</h2>

      {error && (
        <div className="mb-4 bg-red-200 text-red-800 p-3 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          name="nameOnCard"
          placeholder="Name on Card"
          className="input-field mb-4"
          onChange={handleChange}
          required
        />
        <input
          name="cardNumber"
          placeholder="Card Number"
          className="input-field mb-4"
          onChange={handleChange}
          required
        />
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            name="expiryDate"
            placeholder="MM/YY"
            className="input-field"
            onChange={handleChange}
            required
          />
          <input
            name="cvv"
            placeholder="CVV"
            className="input-field"
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="btn-primary w-full py-3"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Complete Purchase'}
        </button>
      </form>
    </div>
  );
}
