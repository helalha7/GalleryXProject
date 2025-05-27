import { NextResponse } from 'next/server';
import { createUser } from '../../../lib/auth';

export async function POST(request) {
  try {
    const userData = await request.json();
    
    // Create the user
    const result = await createUser(userData);
    
    return NextResponse.json({ 
      success: true,
      message: 'User registered successfully',
      userId: result.insertedId
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Registration failed' },
      { status: 400 }
    );
  }
}