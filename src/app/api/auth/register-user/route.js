import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { hashPassword } from '../../../lib/auth';

export async function POST(request) {
  try {
    const userData = await request.json();
    
    console.log('Registering new user:', userData);
    
    // Connect directly to MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const usersCollection = db.collection('users');
    
    // Check if username or email already exists
    const existingUser = await usersCollection.findOne({
      $or: [
        { username: userData.username },
        { email: userData.email }
      ]
    });
    
    if (existingUser) {
      console.log('User already exists:', existingUser);
      return NextResponse.json(
        { error: 'Username or email already exists' },
        { status: 400 }
      );
    }
    
    // Hash the password (in a real app, use bcrypt)
    const hashedPassword = hashPassword(userData.password);
    
    // Create user object
    const newUser = {
      fullName: userData.fullName,
      email: userData.email,
      username: userData.username,
      password: hashedPassword,
      role: userData.role || 'visitor',
      hasPurchasedTicket: false,
      createdAt: new Date()
    };
    
    // Insert user into database
    console.log('Inserting user into database:', newUser);
    const result = await usersCollection.insertOne(newUser);
    console.log('User created with ID:', result.insertedId);
    
    // Return success without sensitive data
    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      userId: result.insertedId
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error.message || 'Registration failed' },
      { status: 500 }
    );
  }
}