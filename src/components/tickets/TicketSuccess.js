'use client';

import { useRouter } from 'next/navigation';

export default function TicketSuccess({ ticket }) {
    const router = useRouter();

    return (
        <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-2">🎉 Ticket Purchased!</h2>
            <p className="mb-4">
                Your ticket is valid until <strong>{new Date(ticket.validUntil).toLocaleDateString()}</strong>.
            </p>
            <button onClick={() => router.push('/explore')} className="btn-primary w-full py-3">
                Start Exploring
            </button>
        </div>
    );
}
