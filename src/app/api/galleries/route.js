import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

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

export async function GET() {
  try {
    console.log('Fetching galleries...');
    
    // Connect directly to MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const collection = db.collection('galleries');
    
    // Get all galleries
    const galleries = await collection.find({ isActive: true }).toArray();
    console.log(`Found ${galleries.length} galleries`);
    
    // Sanitize documents for JSON
    const sanitizedGalleries = galleries.map(gallery => sanitizeDocument(gallery));
    
    return NextResponse.json(sanitizedGalleries);
  } catch (error) {
    console.error('Failed to fetch galleries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch galleries' },
      { status: 500 }
    );
  }
}