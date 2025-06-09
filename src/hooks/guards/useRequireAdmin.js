// hooks/guards/useRequireAdmin.js
'use client';

import useAuth from './useAuth';

export default function useRequireAdmin() {
    const { user, loading } = useAuth();
    const isAdmin = !!user && user.role === 'admin';

    return { user, loading, isAdmin };
}
