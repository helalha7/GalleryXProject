'use client';
import Header from '../../components/shared/Header';
import RegisterForm from '../../components/auth/RegisterForm';
import AuthContainer from '../../components/auth/AuthContainer';
import AnimatedBackdrop from '@/components/shared/AnimatedBackdrop';


export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header/>
      <AnimatedBackdrop/>
      <AuthContainer>
        <h1 className="text-3xl font-display font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Create Your GalleryX Account
        </h1>
        <p className="text-gray-300 text-center mb-8">
          Sign up to explore virtual exhibitions and curated tours.
        </p>
        <RegisterForm />
      </AuthContainer>
    </div>
  );
}
