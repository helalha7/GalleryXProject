'use client';

import { useRouter } from 'next/navigation';
import BuyTicketButton from '@/components/ticket/BuyTicketButton';
import { getTokenFromSession } from '@/utils/sessionStorageHandler';

export default function BuyTicketPage() {
  const router = useRouter();
  const token = getTokenFromSession();

  return (
    <div className="max-w-xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-primary dark:text-white">Buy Your Museum Ticket</h1>
      <BuyTicketButton token={token} onPurchase={() => router.push('/my-ticket')} />
    </div>
  );
}
