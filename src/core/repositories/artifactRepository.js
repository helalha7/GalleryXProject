import { connectToDatabase } from '@/lib/mongoose';
import Artifact from '@/core/models/artifactModel';

// ✅ Create a new artifact
export async function createArtifact(data) {
    await connectToDatabase();

    const artifact = new Artifact({
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
        artist: data.artist,
        createdYear: data.createdYear,
        additionalInfo: data.additionalInfo,
        audioUrl: data.audioUrl,
        gallery: data.gallery,
        views: data.views ?? 0,
        coords: data.coords,
    });

    return await artifact.save();
}

// ✅ Get all artifacts
export async function getAllArtifacts() {
    await connectToDatabase();
    return await Artifact.find();
}


// ✅ Get artifacts by gallery
export async function getArtifactsByGallery(galleryName) {
    await connectToDatabase();
    return await Artifact.find({ gallery: galleryName });
}

// ✅ Increment views by artifact name
export async function incrementArtifactViewsByName(name) {
    await connectToDatabase();

    const updated = await Artifact.findOneAndUpdate(
        { name },
        { $inc: { views: 1 } },
        { new: true }
    );

    if (!updated) {
        throw new Error('Artifact not found');
    }

    return updated;
}

