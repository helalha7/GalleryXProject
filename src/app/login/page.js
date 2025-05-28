'use client';
import Header from '../../components/shared/Header';
import LoginForm from '../../components/auth/LoginForm';
import AuthContainer from '../../components/auth/AuthContainer';
import AnimatedBackdrop from '@/components/shared/AnimatedBackdrop';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <AnimatedBackdrop />
      <AuthContainer>
        <h1 className="text-3xl font-display font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Welcome Back to GalleryX
        </h1>
        <p className="text-gray-300 text-center mb-8">
          Log in to explore virtual exhibitions and curated tours.
        </p>
        <Suspense fallback={<div className="text-center text-gray-400">Loading...</div>}>
          <LoginForm />
        </Suspense>
      </AuthContainer>
    </div>
  );
}
