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
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p className="text-xl animate-pulse">Loading Admin Panel...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // while redirecting
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto bg-gray-950 p-6 transition-all duration-300">
        {children}
      </div>
    </div>
  );
}
