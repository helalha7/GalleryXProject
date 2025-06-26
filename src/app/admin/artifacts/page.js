'use client';

import { useEffect, useState } from 'react';
import {
    fetchAllArtifacts,
    updateArtifact
} from '@/lib/api/artifact';

// Empty fallback function for now since backend is not ready
const dummyUpdateArtifact = async (id, data, token) => {
    console.log('Simulated updateArtifact call with:', id, data);
    return { ...data, _id: id };
};

export default function AdminArtifactsPage() {
    const [artifacts, setArtifacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editArtifact, setEditArtifact] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        imageUrl: '',
        artist: '',
        createdYear: '',
        additionalInfo: '',
        audioUrl: '',
        gallery: '',
    });

    const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;

    useEffect(() => {
        if (!token) {
            setError('No auth token found');
            setLoading(false);
            return;
        }

        fetchAllArtifacts(token)
            .then(setArtifacts)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [token]);

    const handleDelete = async (artifactId) => {
        if (!confirm('Are you sure you want to delete this artifact?')) return;

        try {
            const response = await fetch(`/api/artifacts/${artifactId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to delete artifact');
            }

            setArtifacts((prev) => prev.filter((a) => a._id !== artifactId));
        } catch (err) {
            alert(`Delete failed: ${err.message}`);
        }
    };

    const openEditModal = (artifact) => {
        setEditArtifact(artifact);
        setFormData({
            name: artifact.name || '',
            description: artifact.description || '',
            imageUrl: artifact.imageUrl || '',
            artist: artifact.artist || '',
            createdYear: artifact.createdYear || '',
            additionalInfo: artifact.additionalInfo || '',
            audioUrl: artifact.audioUrl || '',
            gallery: artifact.gallery || '',
        });
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {
        try {
            const updated = await dummyUpdateArtifact(editArtifact._id, formData, token);
            setArtifacts((prev) => prev.map((a) => (a._id === updated._id ? updated : a)));
            setEditArtifact(null);
        } catch (err) {
            alert(`Update failed: ${err.message}`);
        }
    };

    if (loading) return <p className="p-6 text-gray-500 dark:text-gray-300">Loading artifacts...</p>;
    if (error) return <p className="p-6 text-red-600 dark:text-red-400">Error: {error}</p>;

    return (
        <div className="p-6 bg-[#f9fafb] dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 min-h-screen">
            <h1 className="text-2xl font-bold mb-4 text-[#111827] dark:text-white">All Artifacts</h1>

            <table className="min-w-full border border-gray-300 dark:border-gray-600/30 bg-white dark:bg-gray-800">
                <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                        <th className="text-left p-2 text-[#111827] dark:text-gray-300">Name</th>
                        <th className="text-left p-2 text-[#111827] dark:text-gray-300">Artist</th>
                        <th className="text-left p-2 text-[#111827] dark:text-gray-300">Gallery</th>
                        <th className="text-left p-2 text-[#111827] dark:text-gray-300">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {artifacts.map((artifact) => (
                        <tr key={artifact._id} className="border-t border-gray-200 dark:border-gray-600/30">
                            <td className="p-2 text-[#111827] dark:text-white">{artifact.name}</td>
                            <td className="p-2 text-[#111827] dark:text-white">{artifact.artist}</td>
                            <td className="p-2 text-[#111827] dark:text-white">{artifact.gallery}</td>
                            <td className="p-2 space-x-2">
                                <button
                                    onClick={() => openEditModal(artifact)}
                                    className="text-blue-600 hover:underline dark:text-blue-400"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(artifact._id)}
                                    className="text-red-600 hover:underline dark:text-red-400"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editArtifact && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gradient-to-b dark:from-gray-700/50 dark:to-gray-800/50 p-6 rounded shadow-lg w-[500px] text-[#111827] dark:text-white max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">Edit Artifact</h2>

                        {['name', 'artist', 'gallery', 'createdYear', 'imageUrl', 'audioUrl'].map((field) => (
                            <div className="mb-2" key={field}>
                                <label className="block text-sm font-medium capitalize">{field}</label>
                                <input
                                    type="text"
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleFormChange}
                                    className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded mt-1 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                        ))}

                        <div className="mb-2">
                            <label className="block text-sm font-medium">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleFormChange}
                                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded mt-1 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium">Additional Info</label>
                            <textarea
                                name="additionalInfo"
                                value={formData.additionalInfo}
                                onChange={handleFormChange}
                                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded mt-1 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setEditArtifact(null)}
                                className="px-4 py-2 bg-gray-300 text-[#111827] rounded hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-500 text-white rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
