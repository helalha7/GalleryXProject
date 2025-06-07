'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '@/components/shared/Header';
import AnimatedBackdrop from '@/components/shared/AnimatedBackdrop';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import useRequireAuth from '@/hooks/guards/useRequireAuth';
import useRequireTicket from '@/hooks/guards/useRequireTicket';

export default function BuyTicketLayout({ children }) {
    const { user, loading: authLoading, isAuthenticated } = useRequireAuth();
    const { hasValidTicket, loading: ticketLoading } = useRequireTicket();
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/auth?redirect=/buy-ticket');
        }

        if (!authLoading && isAuthenticated && hasValidTicket) {
            router.push('/my-ticket'); // Redirect only if they already have a valid ticket
        }
    }, [authLoading, isAuthenticated, hasValidTicket, router]);

    if (authLoading || ticketLoading) {
        return (
            <>
                <Header user={user} />
                <AnimatedBackdrop />
                <LoadingSpinner />
            </>
        );
    }

    return (
        <>
            <Header user={user} />
            <AnimatedBackdrop />
            <main className="flex-1 p-6 bg-[#f9fafb] dark:bg-gray-900">{children}</main>
        </>
    );
}
