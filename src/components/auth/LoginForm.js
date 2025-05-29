'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import TextInput from '@/components/auth/TextInput';
import SubmitButton from '@/components/auth/SubmitButton';
import { login } from '@/lib/api/auth';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('registered') === 'true') setRegistered(true);
    const redirect = searchParams.get('redirect');
    if (redirect) sessionStorage.setItem('loginRedirect', redirect);
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login({ username, password });

      const redirectUrl = sessionStorage.getItem('loginRedirect');
      sessionStorage.removeItem('loginRedirect');

      if (user.role === 'admin') {
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
        <TextInput
          id="username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextInput
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton loading={loading}>Login</SubmitButton>
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
