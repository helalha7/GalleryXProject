import {
    createGallery,
    getAllGalleries,
    getGalleryById,
    updateGallery,
    deleteGallery
} from '../repositories/galleryRepository';

export async function addGallery(data) {
    return await createGallery(data);
}

export async function fetchGalleries() {
    return await getAllGalleries();
}

export async function fetchGalleryById(id) {
    return await getGalleryById(id);
}

export async function editGallery(id, data) {
    return await updateGallery(id, data);
}

export async function removeGallery(id) {
    return await deleteGallery(id);
}
