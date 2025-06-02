'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserFromSession } from '@/utils/sessionStorageHandler';

export default function useRequireTicket() {
    const router = useRouter();

    useEffect(() => {
        const user = getUserFromSession();
        const hasTicket = user?.ticket || user?.role === 'admin';
        if (!hasTicket) {
            router.push('/tickets');
        }
    }, [router]);
}
