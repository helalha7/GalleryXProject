import { NextResponse } from 'next/server';
import { getCollection } from '../../../lib/db';

export async function POST(request) {
  try {
    const artifactData = await request.json();
    
    // Get collections
    const artifactsCollection = await getCollection('artifacts');
    const galleriesCollection = await getCollection('galleries');
    
    // Add creation timestamp
    const fullArtifactData = {
      ...artifactData,
      dateAdded: new Date(),
      views: 0
    };
    
    // Insert artifact into database
    const result = await artifactsCollection.insertOne(fullArtifactData);
    
    // Update gallery artifact count
    if (artifactData.gallery) {
      await galleriesCollection.updateOne(
        { name: artifactData.gallery },
        { 
          $inc: { artifactsCount: 1 },
          $set: { lastUpdated: new Date() }
        }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Artifact created successfully',
      artifactId: result.insertedId
    });
  } catch (error) {
    console.error('Create artifact error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create artifact' },
      { status: 500 }
    );
  }
}