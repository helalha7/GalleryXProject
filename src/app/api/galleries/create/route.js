import { NextResponse } from 'next/server';
import { getCollection } from '../../../lib/db';

export async function POST(request) {
  try {
    const galleryData = await request.json();
    
    // Get gallery collection
    const galleriesCollection = await getCollection('galleries');
    
    // Check if gallery with same name already exists
    const existingGallery = await galleriesCollection.findOne({ name: galleryData.name });
    if (existingGallery) {
      return NextResponse.json(
        { error: 'A gallery with this name already exists' },
        { status: 400 }
      );
    }
    
    // Add default values
    const fullGalleryData = {
      ...galleryData,
      artifactsCount: 0,
      lastUpdated: new Date(),
      isActive: true
    };
    
    // Insert gallery into database
    const result = await galleriesCollection.insertOne(fullGalleryData);
    
    return NextResponse.json({
      success: true,
      message: 'Gallery created successfully',
      galleryId: result.insertedId
    });
  } catch (error) {
    console.error('Create gallery error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create gallery' },
      { status: 500 }
    );
  }
}