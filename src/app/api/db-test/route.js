import { NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';
import { getCollection } from '../../lib/db';

export async function GET() {
  try {
    console.log('Testing database connection...');
    
    // Test direct connection
    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB_NAME;
    const db = client.db(dbName);
    
    // List collections
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    // Test users collection
    const usersCollection = await getCollection('users');
    const userCount = await usersCollection.countDocuments();
    
    // Test galleries collection
    const galleriesCollection = await getCollection('galleries');
    const galleryCount = await galleriesCollection.countDocuments();
    
    // Test artifacts collection
    const artifactsCollection = await getCollection('artifacts');
    const artifactCount = await artifactsCollection.countDocuments();
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      databaseName: dbName,
      collections: collectionNames,
      counts: {
        users: userCount,
        galleries: galleryCount,
        artifacts: artifactCount
      }
    });
  } catch (error) {
    console.error('Database test failed:', error);
    return NextResponse.json({
      success: false,
      message: `Database connection failed: ${error.message}`,
      error: error.stack
    }, { status: 500 });
  }
}