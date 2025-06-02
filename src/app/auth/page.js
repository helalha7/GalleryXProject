'use client';

import { Suspense } from 'react';
import AuthPage from '@/components/auth/AuthPage'
export default function AuthRoute() {
    return (
        <Suspense fallback={<div className="text-center mt-20 text-gray-500">Loading authentication...</div>}>
            <AuthPage />
        </Suspense>
    );
}
