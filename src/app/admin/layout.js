'use client';

import Sidebar from '../../components/admin/Sidebar';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useRequireAdmin from '@/hooks/guards/useRequireAdmin';

export default function AdminLayout({ children }) {
  const { user, loading, isAdmin } = useRequireAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/auth');
    }
  }, [loading, isAdmin, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // While redirecting
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto bg-black dark:bg-gray-200">
        {children}
      </div>
    </div>
  );
}
