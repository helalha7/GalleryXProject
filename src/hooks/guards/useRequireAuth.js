'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserFromSession } from '@/utils/sessionStorageHandler';

export default function useRequireAuth(redirectTo = '/auth') {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = getUserFromSession();
        if (!storedUser) {
            router.push(redirectTo);
        } else {
            setUser(storedUser);
            setLoading(false);
        }
    }, [router, redirectTo]);

    return { user, loading };
}
