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

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export async function incrementArtifactViewsByName(name) {
    await connectToDatabase();

    const escapedName = escapeRegex(name);

    const updated = await Artifact.findOneAndUpdate(
        { name: { $regex: `^${escapedName}$`, $options: 'i' } }, // exact case-insensitive match
        { $inc: { views: 1 } },
        { new: true }
    );

    if (!updated) {
        throw new Error(`Artifact "${name}" not found`);
    }

    return updated;
}


// ✅ Edit an artifact by ID
export async function editArtifact(id, updatedData) {
    await connectToDatabase();

    const updated = await Artifact.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
    });

    if (!updated) {
        throw new Error('Artifact not found for update');
    }

    return updated;
}

// ✅ Delete an artifact by ID
export async function deleteArtifact(id) {
    await connectToDatabase();

    const deleted = await Artifact.findByIdAndDelete(id);

    if (!deleted) {
        throw new Error('Artifact not found for deletion');
    }

    return deleted;
}
