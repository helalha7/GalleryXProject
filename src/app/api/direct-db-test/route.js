import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET() {
  let client = null;
  
  try {
    console.log('Starting direct DB test...');
    
    // Get connection details from environment
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_DB_NAME;
    
    console.log(`Connecting to MongoDB: ${uri}`);
    console.log(`Database: ${dbName}`);
    
    // Connect directly to MongoDB
    client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB');
    
    // Access the database
    const db = client.db(dbName);
    
    // Create a test user
    const testUser = {
      fullName: 'Test User',
      email: `test-${Date.now()}@example.com`,
      username: `testuser-${Date.now()}`,
      password: 'hashed_testpassword',
      role: 'visitor',
      hasPurchasedTicket: false,
      createdAt: new Date()
    };
    
    // Insert test user
    console.log('Inserting test user:', testUser);
    const result = await db.collection('users').insertOne(testUser);
    console.log('Test user inserted with ID:', result.insertedId);
    
    // Count users to verify
    const userCount = await db.collection('users').countDocuments();
    
    return NextResponse.json({
      success: true,
      message: 'Direct database test successful',
      testUserId: result.insertedId,
      totalUsers: userCount
    });
  } catch (error) {
    console.error('Direct DB test failed:', error);
    return NextResponse.json({
      success: false,
      message: `Direct database test failed: ${error.message}`,
      error: error.stack
    }, { status: 500 });
  } finally {
    // Close the connection
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
}