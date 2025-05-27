import { NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';

// Helper to safely convert MongoDB ID to string
function safeId(id) {
  try {
    return id.toString();
  } catch (e) {
    return id;
  }
}

// Helper to safely convert MongoDB document for JSON
function sanitizeDocument(doc) {
  if (!doc) return null;
  
  // Create a new object to avoid modifying the original
  const sanitized = {};
  
  // Process each field
  Object.keys(doc).forEach(key => {
    if (key === '_id') {
      sanitized._id = safeId(doc._id);
    } else if (doc[key] instanceof Date) {
      sanitized[key] = doc[key].toISOString();
    } else if (typeof doc[key] === 'object' && doc[key] !== null) {
      sanitized[key] = sanitizeDocument(doc[key]);
    } else {
      sanitized[key] = doc[key];
    }
  });
  
  return sanitized;
}

export async function GET(request) {
  try {
    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const gallery = searchParams.get('gallery');
    
    console.log(`Fetching artifacts${gallery ? ` for gallery: ${gallery}` : ''}...`);
    
    // Connect directly to MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const collection = db.collection('artifacts');
    
    // Build query
    let query = {};
    
    if (gallery) {
      // Try to match by gallery ID, name, or other identifiers
      const galleriesCollection = db.collection('galleries');
      let galleryDoc;
      
      try {
        // Try to find gallery by ID or name
        galleryDoc = await galleriesCollection.findOne({
          $or: [
            { _id: gallery }, // If gallery is a string ID
            { name: gallery }  // If gallery is a name
          ]
        });
      } catch (error) {
        console.error('Error finding gallery:', error);
      }
      
      if (galleryDoc) {
        // Use gallery name for matching artifacts
        query.gallery = galleryDoc.name;
      } else {
        // Fallback to direct matching
        query.gallery = gallery;
      }
    }
    
    // Get artifacts
    const artifacts = await collection.find(query).toArray();
    console.log(`Found ${artifacts.length} artifacts`);
    
    // Sanitize documents for JSON
    const sanitizedArtifacts = artifacts.map(artifact => sanitizeDocument(artifact));
    
    return NextResponse.json(sanitizedArtifacts);
  } catch (error) {
    console.error('Failed to fetch artifacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artifacts' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    console.log('Creating new artifact:', data);
    
    // Connect directly to MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const artifactsCollection = db.collection('artifacts');
    const galleriesCollection = db.collection('galleries');
    
    // Add timestamps and default values
    const artifactData = {
      ...data,
      dateAdded: new Date(),
      views: 0
    };
    
    // Insert artifact
    const result = await artifactsCollection.insertOne(artifactData);
    
    // Update gallery artifact count
    if (data.gallery) {
      await galleriesCollection.updateOne(
        { name: data.gallery },
        { 
          $inc: { artifactsCount: 1 },
          $set: { lastUpdated: new Date() }
        }
      );
    }
    
    return NextResponse.json(
      { 
        message: 'Artifact created successfully', 
        id: safeId(result.insertedId) 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to create artifact:', error);
    return NextResponse.json(
      { error: 'Failed to create artifact' },
      { status: 500 }
    );
  }
}