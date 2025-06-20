'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getTokenFromSession } from '@/utils/sessionStorageHandler';
import SectionHeader from '@/components/shared/SectionHeader';
import PaymentForm from '@/components/ticket/PaymentForm';

export default function BuyTicketPage() {
  const router = useRouter();
  const token = getTokenFromSession();
  const [redirectTimer, setRedirectTimer] = useState(null);

  // Clean up the timer when component unmounts
  useEffect(() => {
    return () => {
      if (redirectTimer) {
        clearTimeout(redirectTimer);
      }
    };
  }, [redirectTimer]);

  const handleSuccessfulPurchase = (ticket) => {
    // Set a delay before redirecting to allow the user to see the success message
    const timer = setTimeout(() => {
      router.push('/my-ticket');
    }, 3000); // Increased to 3 seconds to give user time to see the success message
    setRedirectTimer(timer);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <SectionHeader title='Purchase Your Museum Ticket' />
      <div className="mt-8">
        <PaymentForm
          token={token}
          onSuccess={handleSuccessfulPurchase}
        />
      </div>
    </div>
  );
}

