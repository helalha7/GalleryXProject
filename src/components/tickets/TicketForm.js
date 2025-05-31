'use client';

import { useState } from 'react';
import { purchaseTicket } from '@/lib/api/ticket';
import { getTokenFromSession } from '@/utils/sessionStorageHandler';
import StyledTextInput from '@/components/shared/StyledTextInput';
import GradientCard from '@/components/shared/GradientCard';
import GradientButton from '../shared/buttons/GradientButton';
import SectionHeader from '../shared/SectionHeader';

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
    <GradientCard hover={false} className="p-6 md:p-8 max-w-md w-full mx-auto mt-8">
      <form onSubmit={handleSubmit} className="text-white space-y-4">
        <SectionHeader title = {'Purchase Ticket - $15.00'}/>
        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4">
            {error}
          </div>
        )}

        <StyledTextInput
          name="nameOnCard"
          placeholder="Name on Card"
          value={formData.nameOnCard}
          onChange={handleChange}
        />

        <StyledTextInput
          name="cardNumber"
          placeholder="Card Number"
          value={formData.cardNumber}
          onChange={handleChange}
        />

        <div className="grid grid-cols-2 gap-4">
          <StyledTextInput
            name="expiryDate"
            placeholder="MM/YY"
            value={formData.expiryDate}
            onChange={handleChange}
          />
          <StyledTextInput
            name="cvv"
            placeholder="CVV"
            value={formData.cvv}
            onChange={handleChange}
          />
        </div>

        <GradientButton type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Complete Purchase'}
        </GradientButton>
      </form>
    </GradientCard>

  );
}
