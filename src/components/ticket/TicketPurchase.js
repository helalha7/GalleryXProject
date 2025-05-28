'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TicketPurchase({ onComplete }) {
  const [formData, setFormData] = useState({
    nameOnCard: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [user, setUser] = useState(null);
  const [purchaseResult, setPurchaseResult] = useState(null);

  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (!storedUser) {
      router.push('/login?redirect=/tickets');
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // If user already has a ticket, show the completion state
      if (parsedUser.hasPurchasedTicket) {
        setPurchaseComplete(true);
      }
    } catch (e) {
      console.error('Error parsing user from session:', e);
      router.push('/login');
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simple validation
    if (formData.cardNumber.length < 16) {
      setError('Please enter a valid card number');
      setLoading(false);
      return;
    }

    try {
      console.log('Processing ticket purchase...');

      const response = await fetch(`/api/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hasPurchasedTicket: true,
        }),
      });

      const result = await response.json();
      console.log('Update result:', result);

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update ticket status');
      }

      // Update session storage
      const updatedUser = {
        ...user,
        hasPurchasedTicket: true,
      };
      sessionStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);

      setPurchaseComplete(true);
    } catch (err) {
      console.error('Error purchasing ticket:', err);
      setError(err.message || 'Failed to purchase ticket');
    } finally {
      setLoading(false);
    }
  };


  const handleStartTour = () => {
    if (onComplete) {
      onComplete();
    } else {
      router.push('/explore');
    }
  };

  if (!user) {
    return (
      <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (purchaseComplete) {
    return (
      <div className="w-full max-w-md mx-auto text-black dark:bg-gray-200 rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-display font-bold">Start Your Virtual Tour</h2>
          <p className="text-green-600 dark:text-green-400 mt-2">
            Your ticket has been purchased successfully!
          </p>
          <p className="text-black dark:text-black mt-2">
            You now have access to all galleries in GalleryX.
          </p>

          {purchaseResult && (
            <div className="mt-4 p-3 text-black dark:bg-gray-200 rounded-lg text-left">
              <p><strong>Ticket ID:</strong> {purchaseResult.ticketId}</p>
              <p><strong>Expires:</strong> {new Date(purchaseResult.expiryDate).toLocaleDateString()}</p>
            </div>
          )}
        </div>

        <button
          onClick={handleStartTour}
          className="w-full btn-primary py-3"
        >
          Start Tour Now
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto text-black dark:bg-gray-200 rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-display font-bold">Purchase Ticket</h2>
      </div>

      <div className="mb-6 p-4 text-black dark:bg-white rounded-lg">
        <h3 className="text-lg font-semibold mb-1">Virtual Tour Pass</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          Full access to all galleries and exhibits
        </p>
        <p className="text-2xl font-bold">$15.00</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nameOnCard" className="block text-gray-700 dark:text-black mb-2">
            Name on Card
          </label>
          <input
            id="nameOnCard"
            name="nameOnCard"
            type="text"
            className="input-field"
            value={formData.nameOnCard}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cardNumber" className="block text-gray-700 dark:text-black mb-2">
            Card Number
          </label>
          <input
            id="cardNumber"
            name="cardNumber"
            type="text"
            className="input-field"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="expiryDate" className="block text-gray-700 dark:text-black mb-2">
              Expiry Date
            </label>
            <input
              id="expiryDate"
              name="expiryDate"
              type="text"
              className="input-field"
              value={formData.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              required
            />
          </div>

          <div>
            <label htmlFor="cvv" className="block text-gray-700 dark:text-black mb-2">
              CVV
            </label>
            <input
              id="cvv"
              name="cvv"
              type="text"
              className="input-field"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="123"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full btn-primary py-3"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Complete Purchase'}
        </button>
      </form>


    </div>
  );
}