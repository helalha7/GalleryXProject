'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/shared/Header';
import AnimatedBackdrop from '@/components/shared/AnimatedBackdrop';
import AuthContainer from '@/components/auth/AuthContainer';
import TextInput from '@/components/auth/TextInput';
import SubmitButton from '@/components/auth/SubmitButton';
import { login, register } from '@/lib/api/auth';
import { getUserFromSession } from '@/utils/sessionStorageHandler';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const user = getUserFromSession();
        if (user) {
            router.push('/');
            return;
        }

        if (searchParams.get('registered') === 'true') setRegistered(true);
        const redirect = searchParams.get('redirect');
        if (redirect) sessionStorage.setItem('loginRedirect', redirect);
    }, [searchParams, router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setLoading(true);

        try {
            if (isLogin) {
                const user = await login({
                    username: formData.username,
                    password: formData.password,
                });

                const redirectUrl = sessionStorage.getItem('loginRedirect');
                sessionStorage.removeItem('loginRedirect');

                if (user.role === 'admin') {
                    router.push('/admin');
                } else if (redirectUrl) {
                    router.push(redirectUrl);
                } else {
                    router.push('/');
                }
            } else {
                await register(formData);
                setSuccess(true);
                setIsLogin(true); // Switch to login form after successful registration
            }
        } catch (err) {
            setError(err.message || (isLogin ? 'Login failed' : 'Registration failed'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <AnimatedBackdrop />

            <div className="flex-1 flex items-center justify-center">
                <AuthContainer>
                    <h1 className="text-4xl font-display font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                        {isLogin ? 'Welcome Back to GalleryX' : 'Create Your GalleryX Account'}
                    </h1>
                    <p className="text-lg text-[#374151] dark:text-gray-300 text-center mb-10">
                        {isLogin
                            ? 'Log in to explore virtual exhibitions and curated tours.'
                            : 'Sign up to access virtual exhibitions and exclusive galleries.'}
                    </p>

                    {registered && isLogin && (
                        <div className="mb-6 p-3 border text-sm rounded bg-green-100/60 border-green-300 text-green-800 dark:bg-green-100/10 dark:border-green-400/30 dark:text-green-300">
                            Registration successful! Please login with your credentials.
                        </div>
                    )}

                    {success && !isLogin && (
                        <div className="mb-6 p-3 text-sm rounded border bg-green-100/60 border-green-300 text-green-800 dark:bg-green-100/10 dark:border-green-400/30 dark:text-green-300">
                            Registration successful! You can now log in.
                        </div>
                    )}

                    {error && (
                        <div className="mb-4 p-3 text-sm rounded border bg-red-100/60 border-red-300 text-red-800 dark:bg-red-100/10 dark:border-red-400/30 dark:text-red-300">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 text-base text-[#111827] dark:text-white transition-colors duration-300">
                        {!isLogin && (
                            <>
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
                            </>
                        )}

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

                        <SubmitButton loading={loading}>{isLogin ? 'Login' : 'Register'}</SubmitButton>
                    </form>

                    <div className="mt-6 text-center">
                        {isLogin ? (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Don’t have an account?{' '}
                                <button onClick={() => setIsLogin(false)} className="text-blue-500 hover:underline">
                                    Register here
                                </button>
                            </p>
                        ) : (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Already have an account?{' '}
                                <button onClick={() => setIsLogin(true)} className="text-blue-500 hover:underline">
                                    Log in here
                                </button>
                            </p>
                        )}
                    </div>
                </AuthContainer>
            </div>
        </div>
    );
}
