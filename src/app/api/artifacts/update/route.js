import { NextResponse } from 'next/server';
import { getCollection } from '../../../lib/db';
import { ObjectId } from 'mongodb';

export async function PUT(request) {
  try {
    const { id, data } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'Artifact ID is required' },
        { status: 400 }
      );
    }
    
    // Get artifact collection
    const artifactsCollection = await getCollection('artifacts');
    
    // Check if gallery changed
    const originalArtifact = await artifactsCollection.findOne({ _id: new ObjectId(id) });
    const galleryChanged = originalArtifact && originalArtifact.gallery !== data.gallery;
    
    // Update artifact
    const result = await artifactsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
    
    // If gallery changed, update gallery artifact counts
    if (galleryChanged) {
      const galleriesCollection = await getCollection('galleries');
      
      // Decrement count in old gallery
      if (originalArtifact.gallery) {
        await galleriesCollection.updateOne(
          { name: originalArtifact.gallery },
          { 
            $inc: { artifactsCount: -1 },
            $set: { lastUpdated: new Date() }
          }
        );
      }
      
      // Increment count in new gallery
      if (data.gallery) {
        await galleriesCollection.updateOne(
          { name: data.gallery },
          { 
            $inc: { artifactsCount: 1 },
            $set: { lastUpdated: new Date() }
          }
        );
      }
    }
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Artifact not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Artifact updated successfully'
    });
  } catch (error) {
    console.error('Update artifact error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update artifact' },
      { status: 500 }
    );
  }
}