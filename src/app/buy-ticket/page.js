'use client';

import { useRouter } from 'next/navigation';
import BuyTicketButton from '@/components/ticket/BuyTicketButton';
import { getTokenFromSession } from '@/utils/sessionStorageHandler';
import SectionHeader from '@/components/shared/SectionHeader';

export default function BuyTicketPage() {
  const router = useRouter();
  const token = getTokenFromSession();

  return (
    <div className="max-w-xl mx-auto py-16 px-4">
      <SectionHeader title='Buy Your Museum Ticket' />
      <BuyTicketButton token={token} onPurchase={() => router.push('/my-ticket')} />
    </div>
  );
}
