'use client';

import { useRouter } from 'next/navigation';
import SectionHeader from '@/components/shared/SectionHeader';
import GradientCard from '@/components/shared/GradientCard';
import GradientButtonLink from '@/components/shared/buttons/GradientLinkButton';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import useRequireTicket from '@/hooks/guards/useRequireTicket';

export default function MyTicketPage() {
    const { hasValidTicket, ticket, loading, error } = useRequireTicket();
    const router = useRouter();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!hasValidTicket || !ticket) {
        return (
            <div className="max-w-xl mx-auto py-20 px-6 text-center text-red-600 dark:text-red-400">
                <h1 className="text-3xl font-bold mb-4">No Ticket Found</h1>
                <p className="mb-6">
                    {error || 'You don’t have a valid ticket yet.'}
                </p>
                <GradientButtonLink
                    href="/buy-ticket"
                    className="bg-red-500 hover:bg-red-600 text-white"
                >
                    Buy a Ticket
                </GradientButtonLink>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto py-20 px-6">
            <SectionHeader title="🎟️ Your Ticket Info" />

            <GradientCard className="p-6 sm:p-8">
                <div className="text-secondary dark:text-gray-300 mb-2">
                    <strong>Ticket ID:</strong>{' '}
                    <span className="font-mono">{ticket.id}</span>
                </div>
                <div className="text-secondary dark:text-gray-300 mb-2">
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
