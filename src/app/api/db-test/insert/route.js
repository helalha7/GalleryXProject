import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function POST(request) {
  try {
    const { collection, document } = await request.json();
    
    console.log(`Attempting to insert test document into ${collection} collection:`, document);
    
    // Connect directly to MongoDB using the connection string
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    
    await client.connect();
    console.log('Connected to MongoDB directly');
    
    const db = client.db(process.env.MONGODB_DB_NAME);
    const dbCollection = db.collection(collection);
    
    // Insert document
    const result = await dbCollection.insertOne({
      ...document,
      _testInsert: true,
      timestamp: new Date()
    });
    
    // Close connection
    await client.close();
    
    return NextResponse.json({
      success: true,
      message: `Document inserted into ${collection} collection successfully`,
      id: result.insertedId.toString()
    });
  } catch (error) {
    console.error('Test insertion failed:', error);
    return NextResponse.json({
      success: false,
      message: `Failed to insert test document: ${error.message}`,
      error: error.stack
    }, { status: 500 });
  }
}