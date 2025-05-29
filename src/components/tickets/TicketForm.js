'use client';

import { useState } from 'react';
import { purchaseTicket } from '@/lib/api/ticket'; // updated path
import { getTokenFromSession } from '@/utils/sessionStorageHandler';

export default function TicketForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    nameOnCard: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = getTokenFromSession();
      const ticket = await purchaseTicket(token);
      onSuccess(ticket);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg p-6 shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4">Purchase Ticket - $15.00</h2>

      {error && <div className="bg-red-100 text-red-600 p-2 rounded mb-4">{error}</div>}

      <input name="nameOnCard" placeholder="Name on Card" className="input-field mb-3" required onChange={handleChange} />
      <input name="cardNumber" placeholder="Card Number" className="input-field mb-3" required onChange={handleChange} />
      <div className="grid grid-cols-2 gap-4 mb-3">
        <input name="expiryDate" placeholder="MM/YY" className="input-field" required onChange={handleChange} />
        <input name="cvv" placeholder="CVV" className="input-field" required onChange={handleChange} />
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full py-3">
        {loading ? 'Processing...' : 'Complete Purchase'}
      </button>
    </form>
  );
}
