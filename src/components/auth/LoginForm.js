'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const isRegistered = searchParams.get('registered');
    if (isRegistered === 'true') {
      setRegistered(true);
    }

    const redirect = searchParams.get('redirect');
    if (redirect) {
      sessionStorage.setItem('loginRedirect', redirect);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Login failed');
      }

      sessionStorage.setItem('user', JSON.stringify(data.user));

      const redirectUrl = sessionStorage.getItem('loginRedirect');
      sessionStorage.removeItem('loginRedirect');

      if (data.user.role === 'admin') {
        router.push('/admin');
      } else if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        router.push('/');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white">
      {registered && (
        <div className="mb-6 p-3 bg-green-100/10 border border-green-400/30 text-green-300 rounded">
          Registration successful! Please login with your credentials.
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-100/10 border border-red-400/30 text-red-300 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block mb-2 font-medium text-gray-300">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-2 font-medium text-gray-300">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-semibold hover:from-blue-700 hover:to-cyan-500 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-400">
        Don’t have an account?{' '}
        <Link href="/register" className="text-blue-400 hover:underline">
          Create one
        </Link>
      </div>
    </div>
  );
}
