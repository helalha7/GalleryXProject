'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import GradientCard from '@/components/shared/GradientCard';
import GradientLinkButton from '@/components/shared/buttons/GradientLinkButton';
import GradientButton from '@/components/shared/buttons/GradientButton';
import Header from '@/components/shared/Header';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import SectionHeader from '@/components/shared/SectionHeader';
import useRequireAuth from '@/hooks/guards/useRequireAuth';
import { updateUser } from '@/lib/api/user';
import { getTokenFromSession, saveUserSession } from '@/utils/sessionStorageHandler';

export default function MyInfoPage() {
    const router = useRouter();
    const { user, loading, isAuthenticated } = useRequireAuth();

    const [editMode, setEditMode] = useState(false);
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/auth');
        }
    }, [loading, isAuthenticated, router]);

    useEffect(() => {
        if (!loading && user) {
            setFullName(user.fullName || '');
            setUsername(user.username || '');
            setEmail(user.email || '');
        }
    }, [loading, user]);

    if (loading || !isAuthenticated || !user) {
        return <LoadingSpinner message="Loading your info..." />;
    }

    const handleEdit = () => setEditMode(true);

    const handleCancel = () => {
        setFullName(user.fullName || '');
        setUsername(user.username || '');
        setEmail(user.email || '');
        setCurrentPassword('');
        setNewPassword('');
        setEditMode(false);
        setMessage('');
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');

        try {
            const token = getTokenFromSession();
            const updated = await updateUser(
                user._id,
                {
                    fullName,
                    username,
                    email,
                    currentPassword: currentPassword.trim() || undefined,
                    newPassword: newPassword.trim() || undefined
                },
                token
            );

            saveUserSession(updated, token);
            setMessage('✅ Profile updated!');
            setEditMode(false);
        } catch (err) {
            setMessage(err.message || '❌ Error updating profile.');
        }

        setSaving(false);
    };

    return (
        <>
            <Header />
            <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
                <SectionHeader title="My Info" />

                <GradientCard className="px-6 py-6" hover={false}>
                    <div className="space-y-4 text-gray-800 dark:text-gray-200">
                        {editMode ? (
                            <>
                                <EditableRow label="Full Name" value={fullName} onChange={setFullName} />
                                <EditableRow label="Username" value={username} onChange={setUsername} />
                                <EditableRow label="Email" value={email} onChange={setEmail} />
                                <EditableRow label="Current Password" value={currentPassword} onChange={setCurrentPassword} type="password" />
                                <EditableRow label="New Password" value={newPassword} onChange={setNewPassword} type="password" />
                                <InfoRow label="Role" value={user.role} />
                            </>
                        ) : (
                            <>
                                <InfoRow label="Full Name" value={fullName || '—'} />
                                <InfoRow label="Username" value={username || '—'} />
                                <InfoRow label="Email" value={email} />
                                <InfoRow label="Role" value={user.role} />
                            </>
                        )}
                    </div>

                    {message && (
                        <p className="mt-4 text-sm text-center text-red-500 dark:text-red-400">{message}</p>
                    )}

                    <div className="flex justify-end gap-2 mt-6">
                        {editMode ? (
                            <>
                                <GradientButton onClick={handleSave} disabled={saving}>
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </GradientButton>
                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400 transition"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <GradientButton onClick={handleEdit}>Edit Info</GradientButton>
                        )}
                    </div>
                </GradientCard>

                <div className="flex justify-end">
                    <GradientLinkButton href="/">← Back to Home</GradientLinkButton>
                </div>
            </div>
        </>
    );
}

function InfoRow({ label, value }) {
    return (
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
            <span className="font-medium text-gray-900 dark:text-white">{label}</span>
            <span className="text-gray-600 dark:text-gray-400 text-right">{value}</span>
        </div>
    );
}

function EditableRow({ label, value, onChange, type = 'text' }) {
    return (
        <div className="flex flex-col pb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="px-3 py-2 border rounded-md bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
        </div>
    );
}
