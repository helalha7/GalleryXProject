'use client';

import Link from 'next/link';
import GradientCard from '@/components/shared/GradientCard';
import GradientButtonLink from '../shared/buttons/GradientLinkButton';

export default function TicketBanner() {
  return (
    <GradientCard
      hover={false}
      className="mb-10 p-8 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 border border-yellow-500/30 text-center"
    >
      <div className="flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-yellow-400 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
        <h3 className="text-xl font-bold text-yellow-400">Ticket Required</h3>
      </div>
      <p className="text-lg text-[#374151] dark:text-gray-300 mb-6">
        Purchase a virtual tour pass to unlock full access to all museum galleries and interactive experiences.
      </p>
      <GradientButtonLink href="/buy-ticket">
        Purchase Ticket
      </GradientButtonLink>
    </GradientCard>
  );
}
