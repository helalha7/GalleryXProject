import { NextResponse } from 'next/server';
import { getCollection } from '../../../lib/db';

export async function GET() {
  try {
    console.log('Fetching all users for testing...');
    
    // Get users collection
    const usersCollection = await getCollection('users');
    
    // Get all users
    const users = await usersCollection.find({}).toArray();
    
    // For security, remove passwords
    const sanitizedUsers = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    
    return NextResponse.json(sanitizedUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch users' },
      { status: 500 }
    );
  }
}