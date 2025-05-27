'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function Header({ user: initialUser }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(initialUser);
  const pathname = usePathname();
  const router = useRouter();

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, you would check session from API
        // For now, we'll check if there's a user in sessionStorage
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsLoggedIn(true);
          setIsAdmin(parsedUser.role === 'admin');
        }
      } catch (error) {
        console.error('Error checking auth', error);
      }
    };

    if (!user) {
      checkAuth();
    } else {
      setIsLoggedIn(true);
      setIsAdmin(user.role === 'admin');
    }
  }, [user]);

  const handleLogout = () => {
    // In a real app, you would call logout API
    sessionStorage.removeItem('user');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
    router.push('/');
  };

  return (
    <header className="bg-gray-900/95 backdrop-blur-sm text-white py-4 px-6 border-b border-gray-700/50 relative">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 opacity-50"></div>
      
      <div className="max-w-7xl mx-auto flex justify-between items-center relative z-10">
        <Link 
          href="/" 
          className="text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent hover:from-blue-300 hover:to-cyan-200 transition-all duration-300"
        >
          GalleryX
        </Link>
                
        <nav className="flex items-center space-x-2 md:space-x-6">
          <Link 
            href="/"
            className={`group relative px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
              pathname === '/' 
                ? 'text-blue-300 bg-blue-500/20 border border-blue-500/30' 
                : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <span className="relative z-10">Home</span>
            {pathname === '/' && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full"></div>
            )}
          </Link>
                    
          {isLoggedIn && (
            <Link 
              href="/explore"
              className={`group relative px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                pathname.startsWith('/explore') 
                  ? 'text-blue-300 bg-blue-500/20 border border-blue-500/30' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <span className="relative z-10">Explore</span>
              {pathname.startsWith('/explore') && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full"></div>
              )}
            </Link>
          )}
                    
          {isLoggedIn ? (
            <>
              {isAdmin && (
                <Link 
                  href="/admin"
                  className={`group relative px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                    pathname.startsWith('/admin') 
                      ? 'text-purple-300 bg-purple-500/20 border border-purple-500/30' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <span className="relative z-10">Dashboard</span>
                  {pathname.startsWith('/admin') && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full"></div>
                  )}
                </Link>
              )}
                            
              <button
                onClick={handleLogout}
                className="group relative px-4 py-2 text-sm md:text-base font-semibold text-white transition-all duration-300 bg-gradient-to-r from-red-600 to-red-500 rounded-full hover:from-red-500 hover:to-red-400 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 transform"
              >
                <span className="relative z-10">Logout</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            </>
          ) : (
            <Link 
              href="/login"
              className="group relative px-6 py-2 text-sm md:text-base font-semibold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full hover:from-blue-500 hover:to-blue-400 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 transform"
            >
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Link>
          )}
        </nav>
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
    </header>
  );
}