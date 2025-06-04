'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchUserTicket } from '@/lib/api/ticket';
import SectionHeader from '@/components/shared/SectionHeader';
import GradientCard from '@/components/shared/GradientCard';
import { getTokenFromSession } from '@/utils/sessionStorageHandler';
import GradientButtonLink from '@/components/shared/buttons/GradientLinkButton';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function MyTicketPage() {
    const [ticket, setTicket] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getTokenFromSession();
        const fetchTicket = async () => {
            try {
                const res = await fetchUserTicket(token);
                setTicket(res);
            } catch (err) {
                setError(err.message || 'Ticket not found.');
            } finally {
                setLoading(false);
            }
        };

        fetchTicket();
    }, []);

    if (loading) {
        return (<LoadingSpinner/>);
    }

    if (error) {
        return (
            <div className="max-w-xl mx-auto py-20 px-6 text-center text-red-600 dark:text-red-400">
                <h1 className="text-3xl font-bold mb-4">No Ticket Found</h1>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto py-20 px-6">
            <SectionHeader title="🎟️ Your Ticket Info" />

            <GradientCard className="p-6 sm:p-8">
                <div className="text-secondary dark:text-gray-300">
                    <strong>Ticket ID:</strong>{' '}
                    <span className="font-mono">{ticket.id}</span>
                </div>
                <div className="text-secondary dark:text-gray-300">
                    <strong>Valid Until:</strong>{' '}
                    {new Date(ticket.validUntil).toLocaleString()}
                </div>
                <div className="text-secondary dark:text-gray-300">
                    <strong>Purchased At:</strong>{' '}
                    {new Date(ticket.createdAt).toLocaleString()}
                </div>
            </GradientCard>

            <div className="mt-6 flex justify-center">
                <GradientButtonLink href="/explore">
                    Start Exploring
                </GradientButtonLink>
            </div>
        </div>

    );
}
