import {
    createArtifactService,
    getAllArtifactsService,
    getArtifactsByGalleryService,
    incrementViewsService,
} from '@/core/services/artifactService';

export async function handleCreateArtifact(req) {
    try {
        const newArtifact = await createArtifactService(req.body);

        return new Response(JSON.stringify({
            success: true,
            data: newArtifact,
        }), { status: 201 });

    } catch (err) {
        return new Response(JSON.stringify({
            success: false,
            message: err.message || 'Failed to create artifact.',
        }), { status: 400 });
    }
}

export async function handleGetAllArtifacts() {
    try {
        const artifacts = await getAllArtifactsService();

        return new Response(JSON.stringify({
            success: true,
            data: artifacts,
        }), { status: 200 });

    } catch (err) {
        return new Response(JSON.stringify({
            success: false,
            message: err.message || 'Failed to fetch artifacts.',
        }), { status: 500 });
    }
}

export async function handleGetArtifactsByGallery(req) {
    try {
        const { gallery } = req.query;

        const artifacts = await getArtifactsByGalleryService(gallery);

        return new Response(JSON.stringify({
            success: true,
            data: artifacts,
        }), { status: 200 });

    } catch (err) {
        return new Response(JSON.stringify({
            success: false,
            message: err.message || 'Gallery not found or invalid.',
        }), { status: 404 });
    }
}

export async function handleIncrementArtifactViews(req) {
    try {
        const { name } = req.query;

        const updated = await incrementViewsService(name);

        return new Response(JSON.stringify({
            success: true,
            data: updated,
        }), { status: 200 });

    } catch (err) {
        return new Response(JSON.stringify({
            success: false,
            message: err.message || 'Failed to update view count.',
        }), { status: 404 });
    }
}
