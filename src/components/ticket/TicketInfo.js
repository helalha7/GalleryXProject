'use client';

import { useRouter } from 'next/navigation';

export default function TicketInfo({ ticket }) {
  const router = useRouter();

  return (
    <div className="bg-white dark:from-gray-700/50 dark:to-gray-800/50 dark:bg-gradient-to-br shadow-md rounded-lg p-6 border dark:border-gray-600/30">
      <h2 className="text-xl font-semibold text-primary dark:text-white mb-4">🎟️ Ticket Info</h2>

      <p className="text-secondary dark:text-gray-300 mb-1">
        Ticket ID: <span className="font-mono">{ticket.id}</span>
      </p>
      <p className="text-secondary dark:text-gray-300 mb-1">
        Valid Until: <span>{new Date(ticket.validUntil).toLocaleString()}</span>
      </p>
      <p className="text-secondary dark:text-gray-300 mb-6">
        Purchased At: <span>{new Date(ticket.createdAt).toLocaleString()}</span>
      </p>

      <button
        onClick={() => router.push('/explore')}
        className="mt-4 px-6 py-2 font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full hover:from-blue-500 hover:to-cyan-400 transition-all"
      >
        Go to Explore
      </button>
    </div>
  );
}
