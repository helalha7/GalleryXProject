import {
    createArtifact,
    getAllArtifacts,
    getArtifactsByGallery,
    incrementArtifactViewsByName,
    editArtifact,
    deleteArtifact,
} from '@/core/repositories/artifactRepository';

export async function createArtifactService(data) {
    return await createArtifact(data);
}

export async function getAllArtifactsService() {
    return await getAllArtifacts();
}

export async function getArtifactsByGalleryService(galleryName) {
    return await getArtifactsByGallery(galleryName);
}

export async function incrementViewsService(artifactName) {
    return await incrementArtifactViewsByName(artifactName);
}

export async function editArtifactService(id, data) {
    return await editArtifact(id, data);
}

export async function deleteArtifactService(id) {
    return await deleteArtifact(id);
}
