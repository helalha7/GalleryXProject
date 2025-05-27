import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET() {
  try {
    // Try to connect to MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    
    // Get all collections
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(collection => collection.name);
    
    // Check if required collections exist
    const requiredCollections = ['galleries', 'artifacts', 'users', 'tickets'];
    const missingCollections = requiredCollections.filter(name => !collectionNames.includes(name));
    
    if (missingCollections.length > 0) {
      return NextResponse.json({
        connected: true,
        complete: false,
        message: `MongoDB connected, but missing collections: ${missingCollections.join(', ')}`,
        collections: collectionNames
      });
    }
    
    return NextResponse.json({
      connected: true,
      complete: true,
      message: 'MongoDB connected and all required collections exist',
      collections: collectionNames
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json({
      connected: false,
      message: `Failed to connect to MongoDB: ${error.message}`,
    }, { status: 500 });
  }
}