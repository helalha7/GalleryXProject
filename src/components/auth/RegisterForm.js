'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TextInput from '@/components/auth/TextInput';
import SubmitButton from '@/components/auth/SubmitButton';
import { register } from '@/lib/api/auth'; // ✅ import your clean API function

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      await register(formData);
      setSuccess(true);
      router.push('/login?registered=true');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white">
      {success && (
        <div className="mb-6 p-3 bg-green-100/10 border border-green-400/30 text-green-300 rounded">
          Registration successful! Redirecting to login...
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-100/10 border border-red-400/30 text-red-300 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <TextInput
          id="fullName"
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />

        <TextInput
          id="email"
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <TextInput
          id="username"
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />

        <TextInput
          id="password"
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <SubmitButton loading={loading}>Register</SubmitButton>
      </form>

      <div className="mt-6 text-center text-sm text-gray-400">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-400 hover:underline">
          Log in
        </Link>
      </div>
    </div>
  );
}
