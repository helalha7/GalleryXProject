'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchUserTicket } from '@/lib/api/ticket';
import Header from '@/components/shared/Header';
import AnimatedBackdrop from '@/components/shared/AnimatedBackdrop';
import useRequireAuth from '@/hooks/guards/useRequireAuth';
import { getTokenFromSession } from '@/utils/sessionStorageHandler';

export default function BuyTicketLayout({ children }) {
    const { user, loading, isAuthenticated } = useRequireAuth();
    const [checkingTicket, setCheckingTicket] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/auth?redirect=/buy-ticket');
            return;
        }

        const checkTicket = async () => {
            const token = getTokenFromSession();
            if (!token) {
                setCheckingTicket(false);
                return;
            }

            try {
                const ticket = await fetchUserTicket(token);
                if (ticket) {
                    router.push('/my-ticket');
                }
            } catch {
                // No ticket or error: stay on page
            } finally {
                setCheckingTicket(false);
            }
        };

        if (!loading && isAuthenticated) {
            checkTicket();
        }
    }, [loading, isAuthenticated, router]);

    if (loading || checkingTicket) {
        return (
            <>
                <Header user={user} />
                <AnimatedBackdrop />
                <main className="flex-1 p-6 flex items-center justify-center bg-[#f9fafb] dark:bg-gray-900">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin mx-auto mb-6"></div>
                        <p className="text-xl font-medium text-[#374151] dark:text-gray-300">
                            Checking your ticket status...
                        </p>
                    </div>
                </main>
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
