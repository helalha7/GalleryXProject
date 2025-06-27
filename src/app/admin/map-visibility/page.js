'use client';

import { useEffect, useState } from 'react';
import { fetchAllGalleries, updateGallery } from '@/lib/api/gallery';
import { getTokenFromSession } from '@/utils/sessionStorageHandler';

export default function MapVisibilityAdminPage() {
    const [galleries, setGalleries] = useState([]);
    const [saving, setSaving] = useState(false);

    const availablePositions = ['gallery 1', 'gallery 2', 'gallery 3', 'gallery 4', 'gallery 5'];

    useEffect(() => {
        fetchAllGalleries(getTokenFromSession())
            .then(setGalleries)
            .catch(console.error);
    }, []);

    const handleToggle = (id, isActive) => {
        setGalleries((prev) =>
            prev.map((g) =>
                g._id === id
                    ? {
                        ...g,
                        position: isActive ? undefined : getFirstUnusedPosition(prev, id),
                    }
                    : g
            )
        );
    };

    const getFirstUnusedPosition = (all, currentId) => {
        const used = new Set(
            all.filter((g) => g._id !== currentId).map((g) => g.position).filter(Boolean)
        );
        return availablePositions.find((p) => !used.has(p)) || 'unassigned';
    };

    const handlePositionChange = (id, value) => {
        setGalleries((prev) =>
            prev.map((g) => (g._id === id ? { ...g, position: value } : g))
        );
    };

    const handleSave = async () => {
        const token = getTokenFromSession();
        setSaving(true);
        try {
            // Phase 1: Clear all positions
            for (const g of galleries) {
                await updateGallery(g._id, { $unset: { position: '' } }, token);
            }

            // Phase 2: Reapply valid positions
            for (const g of galleries) {
                if (g.position) {
                    await updateGallery(g._id, { position: g.position }, token);
                }
            }

            alert('Visibility updated!');
        } catch (err) {
            console.error(err);
            alert('Failed to update galleries.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-6 min-h-screen bg-white dark:bg-gray-900">
            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
                🗺️ Manage Map Visibility
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
                {galleries.map((g) => (
                    <div
                        key={g._id}
                        className="relative bg-white dark:bg-gray-800 shadow rounded-xl w-[320px] h-[180px] group p-4"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
                                {g.name}
                            </h2>
                            <label className="flex items-center space-x-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={!!g.position}
                                    onChange={() => handleToggle(g._id, !!g.position)}
                                />
                                <span className="text-gray-700 dark:text-gray-300">Show on Map</span>
                            </label>
                        </div>

                        {g.position && (
                            <div className="text-sm">
                                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                                    Position
                                </label>
                                <select
                                    value={g.position}
                                    onChange={(e) => handlePositionChange(g._id, e.target.value)}
                                    className="w-full border rounded px-2 py-1 dark:bg-gray-700 dark:text-white"
                                >
                                    {availablePositions.map((pos) => {
                                        const isUsedByOther = galleries.some(
                                            (other) => other._id !== g._id && other.position === pos
                                        );
                                        return (
                                            <option key={pos} value={pos} disabled={isUsedByOther}>
                                                {pos} {isUsedByOther ? '(in use)' : ''}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
}
