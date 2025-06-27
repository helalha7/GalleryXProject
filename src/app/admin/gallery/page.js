'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchAllGalleries, createGallery, deleteGallery, updateGallery } from "@/lib/api/gallery";
import { Trash, X, Pencil } from "lucide-react";
import FileUploader from "@/components/admin/FileUploader";

export default function AdminArtifactsPage() {
    const [galleries, setGalleries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({ name: "", description: "", image: "", mapImage: "" });
    const [editingGalleryId, setEditingGalleryId] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    const token = typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

    useEffect(() => {
        if (!token) {
            setError("No auth token found");
            setLoading(false);
            return;
        }

        fetchAllGalleries(token)
            .then((fetchedGalleries) => {
                const sorted = [...fetchedGalleries].sort((a, b) => {
                    if (a.name === "Mona Lisa Gallery") return 1;
                    if (b.name === "Mona Lisa Gallery") return -1;
                    return 0;
                });
                setGalleries(sorted);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddOrUpdateGallery = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editingGalleryId) {
                const updated = await updateGallery(editingGalleryId, { name: formData.name, description: formData.description, image: formData.image }, token);
                setGalleries((prev) => prev.map((g) => (g._id === editingGalleryId ? updated : g)));
            } else {
                const created = await createGallery({ ...formData }, token);
                setGalleries((prev) => [...prev, created]);
            }
            setShowAddForm(false);
            resetForm();
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteGallery = async () => {
        if (!confirmDeleteId) return;
        try {
            await deleteGallery(confirmDeleteId, token);
            setGalleries((prev) => prev.filter((g) => g._id !== confirmDeleteId));
        } catch (err) {
            setError(err.message);
        } finally {
            setConfirmDeleteId(null);
        }
    };

    const resetForm = () => {
        setFormData({ name: "", description: "", image: "", mapImage: "" });
        setEditingGalleryId(null);
    };

    if (loading) return <p className="p-6 text-gray-500 dark:text-gray-300">Loading...</p>;
    if (error) return <p className="p-6 text-red-600 dark:text-red-400">Error: {error}</p>;

    return (
        <div className="p-6 min-h-screen bg-white dark:bg-gray-900">
            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">Manage Galleries</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
                {galleries.map((gallery) => (
                    <div key={gallery._id} className="relative bg-white dark:bg-gray-800 shadow rounded-xl w-[320px] h-[460px] group overflow-hidden">
                        <div className="absolute top-3 right-3 z-10 flex gap-2">
                            <button onClick={() => setConfirmDeleteId(gallery._id)} className="text-red-500 hover:text-red-700">
                                <Trash size={20} />
                            </button>
                            <button
                                onClick={() => {
                                    setFormData({ name: gallery.name, description: gallery.description, image: gallery.image });
                                    setEditingGalleryId(gallery._id);
                                    setShowAddForm(true);
                                }}
                                className="text-blue-500 hover:text-blue-700"
                            >
                                <Pencil size={20} />
                            </button>
                        </div>

                        <Link href={`/admin/artifact/${encodeURIComponent(gallery.name)}`} className="block w-full h-full text-left">
                            <div className="relative w-full h-3/5">
                                <Image src={gallery.image} alt={gallery.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="p-4 h-2/5">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{gallery.name}</h2>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{gallery.description}</p>
                            </div>
                        </Link>
                    </div>
                ))}

                <button
                    onClick={() => setShowAddForm(true)}
                    className="rounded-xl p-6 shadow-lg bg-blue-100 dark:bg-gray-700 text-4xl font-bold text-blue-600 dark:text-white hover:bg-blue-200 dark:hover:bg-gray-600 w-[320px] h-[460px]"
                >
                    +
                </button>
            </div>

            {showAddForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{editingGalleryId ? "Edit Gallery" : "Add New Gallery"}</h2>
                            <button
                                onClick={() => {
                                    setShowAddForm(false);
                                    resetForm();
                                }}
                                className="text-gray-500 dark:text-gray-300"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleAddOrUpdateGallery} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gallery Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                                    placeholder="Gallery name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description *</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    rows={3}
                                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                                    placeholder="Gallery description"
                                />
                            </div>
                            <FileUploader label="Gallery Image" onUpload={(url) => setFormData((prev) => ({ ...prev, image: url }))} />
                            <div className="flex justify-end space-x-3 pt-4">
                                <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 border rounded text-gray-700 dark:text-white">Cancel</button>
                                <button type="submit" disabled={submitting} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{submitting ? "Saving..." : editingGalleryId ? "Update Gallery" : "Add Gallery"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {confirmDeleteId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-sm text-center">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Are you sure you want to delete this gallery?</h3>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setConfirmDeleteId(null)}
                                className="px-4 py-2 border rounded text-gray-700 dark:text-white"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteGallery}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
