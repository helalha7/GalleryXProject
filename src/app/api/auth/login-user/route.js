import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { verifyPassword } from '../../../lib/auth';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    
    console.log(`Login attempt for user: ${username}`);
    
    // Connect directly to MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const usersCollection = db.collection('users');
    
    // Find user by username
    const user = await usersCollection.findOne({ username });
    
    console.log('Found user:', user);
    
    if (!user) {
      console.log('User not found in database');
      return NextResponse.json(
        { error: 'User not found' },
        { status: 401 }
      );
    }
    
    // Verify password - try both hashed and direct comparison for testing
    const isPasswordValid = verifyPassword(password, user.password);
    console.log('Password valid:', isPasswordValid);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
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
    return NextResponse.json(
      { error: error.message || 'Authentication failed' },
      { status: 500 }
    );
  }
}