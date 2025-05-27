import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function POST(request) {
  try {
    // Parse the request body
    const { username, password } = await request.json();
    console.log(`Login attempt for user: ${username}`);
    
    // Basic validation
    if (!username || !password) {
      return NextResponse.json({ 
        success: false, 
        error: 'Username and password are required' 
      }, { status: 400 });
    }
    
    // Get MongoDB client
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const usersCollection = db.collection('users');
    
    // Find user by username
    const user = await usersCollection.findOne({ username });
    console.log('User found:', user ? 'Yes' : 'No');
    
    if (!user) {
      console.log('User not found in database');
      return NextResponse.json({ 
        success: false, 
        error: 'User not found' 
      }, { status: 401 });
    }
    
    // Check password (simple check for demo)
    const hashedPassword = `hashed_${password}`;
    const isPasswordValid = user.password === hashedPassword || user.password === password;
    console.log('Password valid:', isPasswordValid);
    
    if (!isPasswordValid) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid password' 
      }, { status: 401 });
    }
    
    // Don't include password in response
    const { password: _, ...userWithoutPassword } = user;
    
    // Return user data
    return NextResponse.json({
      success: true,
      user: userWithoutPassword
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Authentication failed' 
    }, { status: 500 });
  }
}