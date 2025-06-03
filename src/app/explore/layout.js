'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/shared/Header';
import AnimatedBackdrop from '@/components/shared/AnimatedBackdrop';
import useRequireAuth from '@/hooks/guards/useRequireAuth';

export default function ExploreLayout({ children }) {
  const { user, loading, isAuthenticated } = useRequireAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth?redirect=/explore');
    }
  }, [loading, isAuthenticated, router]);

  if (loading || !isAuthenticated) {
    return (
      <>
        <Header user={user} />
        <AnimatedBackdrop />
        <main className="flex-1 p-6 flex items-center justify-center bg-[#f9fafb] dark:bg-gray-900">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-xl font-medium text-[#374151] dark:text-gray-300">
              Preparing your virtual museum experience...
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
