'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from 'lucide-react';
import {
  getUserFromSession
} from '@/utils/sessionStorageHandler';

export default function EditProfilePage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setMounted(true);
    const sessionUser = getUserFromSession();
    if (sessionUser) {
      setUser(sessionUser);
      setEmail(sessionUser.email);
    } else {
      router.push('/auth');
    }
  }, []);

  async function handleUpdate(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const sessionUser = getUserFromSession(); 
      const token = sessionUser?.token;  // Correct token retrieval

      if (!sessionUser) {
        setMessage('❌ User session not found.');
        setLoading(false);
        return;
      }

      const res = await fetch(`/api/users/${sessionUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }), // Ensure token is included
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage('✅ Profile updated successfully!');
        setIsEditing(false);
      } else {
        setMessage(data.message || '❌ Update failed.');
      }
    } catch (error) {
      setMessage('❌ An error occurred.');
    }

    setLoading(false);
  }

  if (!user) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-[#f9fafb] dark:bg-gray-900 flex items-center justify-center">
      <div className="max-w-md w-full p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-600/30 bg-white dark:from-gray-700/50 dark:to-gray-800/50 dark:bg-gradient-to-br backdrop-blur">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300">
            My Profile
          </h1>
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:border-blue-400 transition"
              title="Toggle Theme"
            >
              {theme === 'dark' ? (
                <SunIcon className="h-5 w-5 text-yellow-300" />
              ) : (
                <MoonIcon className="h-5 w-5 text-gray-800" />
              )}
            </button>
          )}
        </div>

        {!isEditing ? (
          <>
            <div className="space-y-2 text-[#374151] dark:text-gray-300">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>User ID:</strong> {user.id}</p>
              <p><strong>Role:</strong> {user.role}</p>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-6 w-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white p-2 rounded-lg hover:from-blue-700 hover:to-cyan-500 transition shadow hover:shadow-lg"
            >
              Edit Details
            </button>
          </>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4 mt-4">
            <div>
              <label className="block mb-1 font-medium text-[#111827] dark:text-gray-100">
                Email
              </label>
              <input
                type="email"
                className="w-full p-2 border rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-[#111827] dark:text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-[#111827] dark:text-gray-100">
                New Password
              </label>
              <input
                type="password"
                placeholder="Leave blank to keep current password"
                className="w-full p-2 border rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-[#111827] dark:text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex space-x-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-400 text-white p-2 rounded-lg hover:from-blue-700 hover:to-cyan-500 transition shadow hover:shadow-lg"
              >
                {loading ? 'Updating...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {message && (
          <p className="mt-4 text-center text-sm text-red-500">{message}</p>
        )}

        <Link
          href="/"
          className="mt-6 block w-full text-center bg-gradient-to-r from-blue-600 to-cyan-400 text-white p-2 rounded-lg hover:from-blue-700 hover:to-cyan-500 transition shadow hover:shadow-lg"
        >
          Home Page
        </Link>
      </div>
    </div>
  );
}
