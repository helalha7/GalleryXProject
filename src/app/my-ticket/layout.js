'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/shared/Header';
import AnimatedBackdrop from '@/components/shared/AnimatedBackdrop';
import useRequireAuth from '@/hooks/guards/useRequireAuth';

export default function MyTicketLayout({ children }) {
    const { user, loading, isAuthenticated } = useRequireAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/auth?redirect=/my-ticket');
        }
    }, [loading, isAuthenticated, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-lg">
                Authenticating...
            </div>
        );
    }

    return (
        <>
            <Header user={user} />
            <AnimatedBackdrop />
            <main className="flex-1 bg-[#f9fafb] dark:bg-gray-900 transition-colors duration-300">
                {children}
            </main>
        </>
    );
}
