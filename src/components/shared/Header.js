'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getUserFromSession, clearSession } from '@/utils/sessionStorageHandler';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon, MenuIcon, XIcon } from 'lucide-react';

export default function Header() {
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const sessionUser = getUserFromSession();
    if (sessionUser) setUser(sessionUser);
  }, []);

  const handleLogout = () => {
    clearSession();
    setUser(null);
    router.push('/');
  };

  const toggleTheme = () => {
    if (!mounted) return;
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const isLoggedIn = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <header className="z-50 bg-[#111827] text-white dark:bg-gray-900/95 dark:text-white backdrop-blur-sm py-4 px-6 border-b border-gray-800 dark:border-gray-700/50 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative z-10">
        <Link
          href="/"
          className="text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent hover:from-blue-400 hover:to-cyan-300 transition-all duration-300"
        >
          GalleryX
        </Link>

        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-white"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-2 md:space-x-6">
          <NavItems
            pathname={pathname}
            isLoggedIn={isLoggedIn}
            isAdmin={isAdmin}
            toggleTheme={toggleTheme}
            mounted={mounted}
            theme={theme}
            handleLogout={handleLogout}
            user={user}
          />
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-3 text-sm flex flex-col items-start px-6 pb-6">
          <NavItems
            pathname={pathname}
            isLoggedIn={isLoggedIn}
            isAdmin={isAdmin}
            toggleTheme={toggleTheme}
            mounted={mounted}
            theme={theme}
            handleLogout={handleLogout}
            user={user}
            mobile
          />
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
    </header>
  );
}

function NavItems({
  pathname,
  isLoggedIn,
  isAdmin,
  toggleTheme,
  mounted,
  theme,
  handleLogout,
  user,
  mobile = false,
}) {
  const [showDropdown, setShowDropdown] = useState(false);

  const linkClasses = (active) =>
    `group relative px-4 py-2 rounded-full font-medium transition-all duration-300 ${active
      ? 'bg-gray-700 text-white border border-gray-600 dark:text-blue-300 dark:bg-blue-500/20 dark:border-blue-500/30'
      : 'text-white hover:bg-gray-800 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700/50'
    } ${mobile ? 'w-full text-left' : ''}`;

  return (
    <>
      <Link href="/" className={linkClasses(pathname === '/')}>
        Home
      </Link>

      {isLoggedIn && (
        <Link href="/explore" className={linkClasses(pathname.startsWith('/explore'))}>
          Explore
        </Link>
      )}

      {/* Theme toggle */}
      {mounted ? (
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full border border-gray-600 dark:border-gray-600 hover:border-blue-400 transition-colors ${mobile ? 'mt-2' : ''
            }`}
          title="Toggle Theme"
        >
          {(theme === 'dark' || !theme) ? (
            <SunIcon className="h-5 w-5 text-yellow-300" />
          ) : (
            <MoonIcon className="h-5 w-5 text-white" />
          )}
        </button>
      ) : (
        <div className={`w-9 h-9 rounded-full border border-gray-600 animate-pulse ${mobile ? 'mt-2' : ''}`} />
      )}

      {/* Auth Section */}
      {isLoggedIn ? (
        <>
          {isAdmin && (
            <Link
              href="/admin"
              className={linkClasses(pathname.startsWith('/admin'))}
            >
              Dashboard
            </Link>
          )}

          {!mobile ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="px-6 py-2 font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full hover:from-blue-500 hover:to-cyan-400 transition-all"
              >
                Account ▾
              </button>

              {showDropdown && (
                <div
                  className="absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5"
                >
                  <div className="py-1 text-sm text-gray-800 dark:text-gray-100">
                    <Link
                      href="/profile/edit"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Edit Profile
                    </Link>
                    <Link
                      href="/my-ticket"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      My Ticket Info
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/profile/edit" className={linkClasses(false)}>
                Edit Profile
              </Link>
              <Link href="/my-ticket" className={linkClasses(false)}>
                My Ticket Info
              </Link>
              <button
                onClick={handleLogout}
                className={`px-6 py-2 font-semibold text-white bg-gradient-to-r from-red-600 to-red-500 rounded-full hover:from-red-500 hover:to-red-400 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 transform ${mobile ? 'w-full text-left' : ''
                  }`}
              >
                Logout
              </button>
            </>
          )}
        </>
      ) : (
        <Link
          href="/auth"
          className={`px-6 py-2 font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-full hover:from-blue-500 hover:to-blue-400 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 transform ${mobile ? 'w-full text-left' : ''
            }`}
        >
          Login
        </Link>
      )}
    </>
  );
}
