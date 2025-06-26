// repositories/galleryRepository.js

import Gallery from '../models/galleryModel';
import { connectToDatabase } from '@/lib/mongoose';

export async function createGallery(data) {
    await connectToDatabase();
    return await Gallery.create(data);
}

export async function getAllGalleries() {
    await connectToDatabase();
    return await Gallery.find({});
}

export async function getGalleryById(id) {
    await connectToDatabase();
    return await Gallery.findById(id);
}

export async function updateGallery(id, updateData) {
    await connectToDatabase();
    return await Gallery.findByIdAndUpdate(id, updateData, { new: true });
}

export async function deleteGallery(id) {
    await connectToDatabase();
    return await Gallery.findByIdAndDelete(id);
}
