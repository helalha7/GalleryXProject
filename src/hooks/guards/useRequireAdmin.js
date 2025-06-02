'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserFromSession } from '@/utils/sessionStorageHandler';

export default function useRequireAdmin() {
    const router = useRouter();

    useEffect(() => {
        const user = getUserFromSession();
        if (user?.role !== 'admin') {
            router.push('/');
        }
    }, [router]);
}
