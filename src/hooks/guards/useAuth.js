'use client';
import { useEffect, useState } from 'react';
import { getUserFromSession } from '@/utils/sessionStorageHandler';

export default function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = getUserFromSession();
        setUser(storedUser || null);
        setLoading(false);
    }, []);

    return { user, loading };
}
