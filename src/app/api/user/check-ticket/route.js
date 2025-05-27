import { NextResponse } from 'next/server';
import { getCollection } from '../../../lib/db';
import { ObjectId } from 'mongodb';

export async function POST(request) {
  try {
    const { userId } = await request.json();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Get user from database
    const usersCollection = await getCollection('users');
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Check if user has purchased a ticket
    if (!user.hasPurchasedTicket) {
      return NextResponse.json({
        hasTicket: false,
        message: 'User has not purchased a ticket'
      });
    }
    
    // Check if ticket has expired
    const ticketExpiry = new Date(user.ticketExpiry);
    const now = new Date();
    
    if (ticketExpiry < now) {
      // Update user to indicate ticket has expired
      await usersCollection.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { hasPurchasedTicket: false } }
      );
      
      return NextResponse.json({
        hasTicket: false,
        expired: true,
        message: 'Ticket has expired'
      });
    }
    
    return NextResponse.json({
      hasTicket: true,
      expiryDate: ticketExpiry,
      message: 'User has a valid ticket'
    });
  } catch (error) {
    console.error('Check ticket error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to check ticket' },
      { status: 500 }
    );
  }
}