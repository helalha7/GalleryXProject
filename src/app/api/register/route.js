import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function POST(request) {
  try {
    // Parse the request body
    const userData = await request.json();
    console.log('Received registration data:', userData);
    
    // Basic validation
    if (!userData.username || !userData.password || !userData.email || !userData.fullName) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields' 
      }, { status: 400 });
    }
    
    // Get MongoDB client
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const usersCollection = db.collection('users');
    
    // Check if user already exists
    const existingUser = await usersCollection.findOne({ 
      $or: [
        { username: userData.username }, 
        { email: userData.email }
      ] 
    });
    
    if (existingUser) {
      console.log('User already exists:', existingUser.username);
      return NextResponse.json({ 
        success: false, 
        error: 'Username or email already exists' 
      }, { status: 400 });
    }
    
    // Prepare user object
    const newUser = {
      fullName: userData.fullName,
      email: userData.email,
      username: userData.username,
      // Simple password hashing for demo
      password: `hashed_${userData.password}`,
      role: userData.role || 'visitor',
      hasPurchasedTicket: false,
      createdAt: new Date()
    };
    
    // Insert user into database
    console.log('Inserting user into database:', newUser);
    const result = await usersCollection.insertOne(newUser);
    console.log('User created with ID:', result.insertedId);
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      userId: result.insertedId.toString()
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Registration failed' 
    }, { status: 500 });
  }
}