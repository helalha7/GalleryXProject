'use client';

import Sidebar from '../../components/admin/Sidebar';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Check if user is an admin
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, you would check session from API
        // For now, we'll check if there's a user in sessionStorage
        const storedUser = sessionStorage.getItem('user');
        if (!storedUser) {
          throw new Error('Not authenticated');
        }
        
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.role !== 'admin') {
          throw new Error('Not authorized');
        }
        
        setIsAuthorized(true);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthorized(false);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [pathname, router]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }
  
  if (!isAuthorized) {
    return null; // Don't render anything while redirecting
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