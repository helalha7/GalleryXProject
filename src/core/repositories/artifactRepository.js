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
    gallery: data.gallery, // assumed to be string
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

// ✅ Enhanced: Get total views grouped by gallery + artifact breakdown
export async function getGalleryViewsSummary() {
  await connectToDatabase();

  const artifacts = await Artifact.find();

  const galleryViews = {};

  for (const artifact of artifacts) {
    const galleryName = artifact.gallery || 'Unknown';

    if (!galleryViews[galleryName]) {
      galleryViews[galleryName] = {
        gallery: galleryName,
        views: 0,
        artifacts: [],
      };
    }

    galleryViews[galleryName].views += artifact.views;
    galleryViews[galleryName].artifacts.push({
      name: artifact.name,
      views: artifact.views,
    });
  }

  return Object.values(galleryViews);
}
