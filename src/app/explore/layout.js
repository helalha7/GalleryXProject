'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/shared/Header';
import AnimatedBackdrop from '@/components/shared/AnimatedBackdrop';
import useRequireAuth from '@/hooks/guards/useRequireAuth';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

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
        <LoadingSpinner/>
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
