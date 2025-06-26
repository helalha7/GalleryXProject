import {
    addGallery,
    fetchGalleries,
    fetchGalleryById,
    editGallery,
    removeGallery
} from '../services/galleryService';

export async function addGalleryController(req) {
    try {
        const body = await req.json();
        const gallery = await addGallery(body);
        return new Response(JSON.stringify({ success: true, data: gallery }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
    }
}

export async function getGalleriesController() {
    try {
        const galleries = await fetchGalleries();
        return new Response(JSON.stringify({ success: true, data: galleries }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
    }
}

export async function getGalleryController(req, { params }) {
    try {
        const gallery = await fetchGalleryById(params.id);
        if (!gallery) {
            return new Response(JSON.stringify({ success: false, message: 'Gallery not found' }), { status: 404 });
        }
        return new Response(JSON.stringify({ success: true, data: gallery }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
    }
}

export async function updateGalleryController(req, { params }) {
    try {
        const body = await req.json();
        const updated = await editGallery(params.id, body);
        return new Response(JSON.stringify({ success: true, data: updated }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
    }
}

export async function deleteGalleryController(req, { params }) {
    try {
        await removeGallery(params.id);
        return new Response(JSON.stringify({ success: true, message: 'Deleted' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
    }
}
