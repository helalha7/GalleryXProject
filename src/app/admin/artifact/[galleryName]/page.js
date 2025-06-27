'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    fetchArtifactsByGallery,
    updateArtifact,
    deleteArtifact,
    createArtifact
} from '@/lib/api/artifact';
import { fetchAllGalleries } from '@/lib/api/gallery';
import { Pencil, Trash } from 'lucide-react';
import FileUploader from '@/components/admin/FileUploader';
import Image from 'next/image';

export default function GalleryArtifactsPage() {
    const { galleryName } = useParams();
    const router = useRouter();
    const [artifacts, setArtifacts] = useState([]);
    const [galleries, setGalleries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingArtifact, setEditingArtifact] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        artist: '',
        createdYear: '',
        additionalInfo: '',
        audioUrl: '',
        imageUrl: '',
        gallery: '',
        coords: { x: '', y: '', width: '', height: '' },
    });
    const [submitting, setSubmitting] = useState(false);
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;

    const drawing = useRef(false);
    const start = useRef({ x: 0, y: 0 });
    const selectionBoxRef = useRef(null);

    useEffect(() => {
        if (!galleryName || !token) return;

        const fetchData = async () => {
            try {
                const normalizedName = decodeURIComponent(galleryName).toUpperCase();
                const [artifactData, allGalleries] = await Promise.all([
                    fetchArtifactsByGallery(normalizedName, token),
                    fetchAllGalleries(token),
                ]);
                setArtifacts(artifactData);
                setGalleries(allGalleries);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [galleryName, token]);

    const galleryMapImage = galleries.find((g) =>
        g.name.toUpperCase() === decodeURIComponent(galleryName).toUpperCase()
    )?.mapImage;

    const handleMouseDown = (e) => {
        if (!selectionBoxRef.current) return;
        drawing.current = true;

        const rect = selectionBoxRef.current.getBoundingClientRect();
        const startX = e.clientX - rect.left;
        const startY = e.clientY - rect.top;
        start.current = { x: startX, y: startY };

        setFormData((prev) => ({
            ...prev,
            coords: { x: '', y: '', width: '', height: '' }
        }));
    };

    const handleMouseMove = (e) => {
        if (!drawing.current || !selectionBoxRef.current) return;

        const rect = selectionBoxRef.current.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;

        const x = Math.min(start.current.x, currentX);
        const y = Math.min(start.current.y, currentY);
        const width = Math.abs(currentX - start.current.x);
        const height = Math.abs(currentY - start.current.y);

        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;
        const widthPercent = (width / rect.width) * 100;
        const heightPercent = (height / rect.height) * 100;

        setFormData((prev) => ({
            ...prev,
            coords: {
                x: xPercent.toFixed(4),
                y: yPercent.toFixed(4),
                width: widthPercent.toFixed(4),
                height: heightPercent.toFixed(4),
            },
        }));
    };

    const handleMouseUp = () => {
        drawing.current = false;
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        if (["x", "y", "width", "height"].includes(name)) {
            setFormData((prev) => ({
                ...prev,
                coords: {
                    ...prev.coords,
                    [name]: value,
                },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name) return;
        setSubmitting(true);
        try {
            if (editingArtifact) {
                const updated = await updateArtifact(editingArtifact._id, formData, token);
                setArtifacts((prev) =>
                    prev.map((a) => (a._id === updated._id ? updated : a))
                );
            } else {
                const created = await createArtifact(formData, token);
                setArtifacts((prev) => [...prev, created]);
            }
            setShowForm(false);
            setEditingArtifact(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleAddNew = () => {
        setEditingArtifact(null);
        setFormData({
            name: '',
            description: '',
            artist: '',
            createdYear: '',
            additionalInfo: '',
            audioUrl: '',
            imageUrl: '',
            gallery: decodeURIComponent(galleryName).toUpperCase(),
            coords: { x: '', y: '', width: '', height: '' },
        });
        setShowForm(true);
    };

    if (loading) return <div className="p-6">Loading...</div>;
    if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

    return (
        <div className="p-6 min-h-screen bg-white dark:bg-gray-900">
            <div className="mb-6">
                <button onClick={() => router.push('/admin/gallery')}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    ← Back to Galleries
                </button>
            </div>

            <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                Artifacts in "{decodeURIComponent(galleryName)}"
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
                {artifacts.map((artifact) => (
                    <div key={artifact._id} className="relative bg-white dark:bg-gray-800 shadow rounded-xl w-full max-w-sm group overflow-hidden">
                        <div className="absolute top-2 right-2 z-10 flex gap-2">
                            <button onClick={() => {
                                setEditingArtifact(artifact);
                                setFormData({
                                    name: artifact.name || '',
                                    description: artifact.description || '',
                                    artist: artifact.artist || '',
                                    createdYear: artifact.createdYear || '',
                                    additionalInfo: artifact.additionalInfo || '',
                                    audioUrl: artifact.audioUrl || '',
                                    imageUrl: artifact.imageUrl || '',
                                    gallery: artifact.gallery || '',
                                    coords: artifact.coords || { x: '', y: '', width: '', height: '' },
                                });
                                setShowForm(true);
                            }} className="text-blue-500 hover:text-blue-700">
                                <Pencil size={20} />
                            </button>
                            <button onClick={async () => {
                                if (!confirm('Are you sure you want to delete this artifact?')) return;
                                try {
                                    await deleteArtifact(artifact._id, token);
                                    setArtifacts((prev) => prev.filter((a) => a._id !== artifact._id));
                                } catch (err) {
                                    setError(err.message);
                                }
                            }} className="text-red-500 hover:text-red-700">
                                <Trash size={20} />
                            </button>
                        </div>
                        <div className="relative w-full aspect-[3/4]">
                            <Image src={artifact.imageUrl} alt={artifact.name} fill className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{artifact.name}</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{artifact.artist}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{artifact.createdYear}</p>
                        </div>
                    </div>
                ))}
                <button onClick={handleAddNew} type="button" className="rounded-xl p-6 shadow-lg bg-blue-100 dark:bg-gray-700 text-4xl font-bold text-blue-600 dark:text-white hover:bg-blue-200 dark:hover:bg-gray-600 w-full max-w-sm h-[400px]">
                    +
                </button>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                            {editingArtifact ? 'Edit Artifact' : 'Add New Artifact'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input name="name" value={formData.name} onChange={handleFormChange} placeholder="Name" required className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white" />
                            <textarea name="description" value={formData.description} onChange={handleFormChange} placeholder="Description" className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white" />
                            <input name="artist" value={formData.artist} onChange={handleFormChange} placeholder="Artist" className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white" />
                            <input name="createdYear" value={formData.createdYear} onChange={handleFormChange} placeholder="Created Year" className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white" />
                            <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleFormChange} placeholder="Additional Info" className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white" />
                            <FileUploader label="Image File" onUpload={(url) => setFormData((prev) => ({ ...prev, imageUrl: url }))} />
                            <FileUploader label="Audio File" onUpload={(url) => setFormData((prev) => ({ ...prev, audioUrl: url }))} />
                            <input name="gallery" value={formData.gallery} onChange={handleFormChange} placeholder="Gallery" className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white" />

                            {galleryMapImage && (
                                <div className="mt-4">
                                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Draw a box on the Gallery Map to set Coords</label>
                                    <div
                                        ref={selectionBoxRef}
                                        className="relative w-full aspect-[1182/710] border rounded overflow-hidden cursor-crosshair"
                                        onMouseDown={handleMouseDown}
                                        onMouseMove={handleMouseMove}
                                        onMouseUp={handleMouseUp}
                                    >
                                        <Image src={galleryMapImage} alt="Gallery map" fill className="object-contain pointer-events-none" />
                                        {formData.coords.width && formData.coords.height && (
                                            <div
                                                className="absolute border-2 border-red-500 bg-red-500/30 pointer-events-none"
                                                style={{
                                                    left: `${formData.coords.x}%`,
                                                    top: `${formData.coords.y}%`,
                                                    width: `${formData.coords.width}%`,
                                                    height: `${formData.coords.height}%`,
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                <input type="number" name="x" value={formData.coords.x} onChange={handleFormChange} placeholder="X (%)" className="px-2 py-1 border rounded dark:bg-gray-700 dark:text-white" />
                                <input type="number" name="y" value={formData.coords.y} onChange={handleFormChange} placeholder="Y (%)" className="px-2 py-1 border rounded dark:bg-gray-700 dark:text-white" />
                                <input type="number" name="width" value={formData.coords.width} onChange={handleFormChange} placeholder="Width (%)" className="px-2 py-1 border rounded dark:bg-gray-700 dark:text-white" />
                                <input type="number" name="height" value={formData.coords.height} onChange={handleFormChange} placeholder="Height (%)" className="px-2 py-1 border rounded dark:bg-gray-700 dark:text-white" />
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border rounded text-gray-700 dark:text-white">Cancel</button>
                                <button type="submit" disabled={submitting} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                    {submitting ? 'Saving...' : editingArtifact ? 'Update Artifact' : 'Add Artifact'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
