import {
    createArtifactService,
    getAllArtifactsService,
    getArtifactsByGalleryService,
    incrementViewsService,
} from '@/core/services/artifactService';

export async function handleCreateArtifact(req, res) {
    try {
        const newArtifact = await createArtifactService(req.body);
        return res.status(201).json({ success: true, data: newArtifact });
    } catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
}

export async function handleGetAllArtifacts(req, res) {
    try {
        const artifacts = await getAllArtifactsService();
        return res.status(200).json({ success: true, data: artifacts });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function handleGetArtifactsByGallery(req, res) {
    try {
        const { gallery } = req.query;
        const artifacts = await getArtifactsByGalleryService(gallery);
        return res.status(200).json({ success: true, data: artifacts });
    } catch (err) {
        return res.status(404).json({ success: false, message: err.message });
    }
}

export async function handleIncrementArtifactViews(req, res) {
    try {
        const { name } = req.query;
        const updated = await incrementViewsService(name);
        return res.status(200).json({ success: true, data: updated });
    } catch (err) {
        return res.status(404).json({ success: false, message: err.message });
    }
}
