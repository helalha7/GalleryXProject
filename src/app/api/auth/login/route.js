import { NextResponse } from 'next/server';
import { authenticateUser, createSessionCookie } from '../../../lib/auth';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    
    // Authenticate the user
    const user = await authenticateUser(username, password);
    
    // Create a session
    const session = createSessionCookie(user);
    
    // Return the user data (without password)
    return NextResponse.json({ 
      success: true, 
      user: {
        _id: user._id,
        username: user.username,
        role: user.role
      },
      session
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Authentication failed' },
      { status: 401 }
    );
  }
}