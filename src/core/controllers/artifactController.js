import {
    createArtifactService,
    getAllArtifactsService,
    getArtifactsByGalleryService,
    incrementViewsService,
    editArtifactService,
    deleteArtifactService,
} from '@/core/services/artifactService';

/**
 * Create a new artifact (POST /api/artifact)
 */
export async function handleCreateArtifact(req) {
    try {
        const body = typeof req.json === 'function' ? await req.json() : req.body;

        const newArtifact = await createArtifactService(body);

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

/**
 * Get all artifacts (GET /api/artifact)
 */
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

/**
 * Get artifacts by gallery name (GET /api/artifact/gallery?gallery=NAME)
 */
export async function handleGetArtifactsByGallery(req) {
    try {
        const rawGallery = req.query?.gallery;
        if (!rawGallery) throw new Error('Missing gallery parameter');
        const gallery = rawGallery.toUpperCase();

        const artifacts = await getArtifactsByGalleryService(gallery);

        return new Response(JSON.stringify({
            success: true,
            data: artifacts,
        }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({
            success: false,
            message: err.message || 'Failed to fetch artifacts.',
        }), { status: 400 });
    }
}

/**
 * Increment views (PATCH /api/artifact/views?name=ArtifactName)
 */
export async function handleIncrementArtifactViews(req) {
    try {
        const name = req.query?.name;

        if (!name) {
            throw new Error('Missing artifact name');
        }

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


/**
 * Update artifact (PATCH /api/artifact/:id)
 */
export async function handleUpdateArtifact(req, { params }) {
    try {
        const body = await req.json(); // ✅ Required in App Router
        const updated = await editArtifactService(params.id, body);

        return new Response(JSON.stringify({
            success: true,
            data: updated,
        }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({
            success: false,
            message: err.message || 'Failed to update artifact.',
        }), { status: 400 });
    }
}

/**
 * Delete artifact (DELETE /api/artifact/:id)
 */
export async function handleDeleteArtifact(req, { params }) {
    try {
        const deleted = await deleteArtifactService(params.id);

        return new Response(JSON.stringify({
            success: true,
            data: deleted,
        }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({
            success: false,
            message: err.message || 'Failed to delete artifact.',
        }), { status: 404 });
    }
}
