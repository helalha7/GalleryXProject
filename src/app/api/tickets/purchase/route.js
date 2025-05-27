import { NextResponse } from 'next/server';
import { createDocument, getCollection } from '../../../lib/db';
import { getSession } from '../../../lib/auth';

export async function POST(request) {
  try {
    const session = getSession();
    
    if (!session || !session.userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const { ticketType, price } = await request.json();
    
    // Create ticket record
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30); // 30-day ticket
    
    const ticketData = {
      userId: session.userId,
      type: ticketType,
      price: price,
      purchaseDate: new Date(),
      expiryDate: expiryDate,
      isActive: true
    };
    
    const result = await createDocument('tickets', ticketData);
    
    // Update user record
    const usersCollection = await getCollection('users');
    await usersCollection.updateOne(
      { _id: session.userId },
      { 
        $set: { 
          hasPurchasedTicket: true,
          ticketExpiry: expiryDate
        } 
      }
    );
    
    return NextResponse.json({
      success: true,
      message: 'Ticket purchased successfully',
      ticketId: result.insertedId,
      expiryDate: expiryDate
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to purchase ticket' },
      { status: 500 }
    );
  }
}