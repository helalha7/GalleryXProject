'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserFromSession } from '@/utils/sessionStorageHandler';

export default function useRequireAuth() {
    const router = useRouter();

    useEffect(() => {
        const user = getUserFromSession();
        if (!user) {
            router.push('/login');
        }
    }, [router]);
}
