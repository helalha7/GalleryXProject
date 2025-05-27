import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request) {
  try {
    const data = await request.json();
    const { userId, cardDetails } = data;
    
    console.log('Processing ticket purchase for user:', userId);
    console.log('Card details:', cardDetails);
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Connect directly to MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const usersCollection = db.collection('users');
    const ticketsCollection = db.collection('tickets');
    
    // Verify user exists
    let userObjectId;
    try {
      userObjectId = new ObjectId(userId);
    } catch (error) {
      console.error('Invalid user ID format:', error);
      return NextResponse.json(
        { error: 'Invalid user ID format' },
        { status: 400 }
      );
    }
    
    const user = await usersCollection.findOne({ _id: userObjectId });
    if (!user) {
      console.error('User not found:', userId);
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Create ticket
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30); // 30-day ticket
    
    const ticketData = {
      userId: userObjectId,
      type: 'Virtual Tour Pass',
      price: 15.00,
      purchaseDate: new Date(),
      expiryDate: expiryDate,
      paymentInfo: {
        cardName: cardDetails.nameOnCard,
        lastFour: cardDetails.cardNumber.slice(-4),
        cardExpiry: cardDetails.expiryDate
      },
      isActive: true
    };
    
    console.log('Creating ticket:', ticketData);
    
    // Insert ticket into database
    const ticketResult = await ticketsCollection.insertOne(ticketData);
    console.log('Ticket created with ID:', ticketResult.insertedId);
    
    // Update user with ticket information
    const userUpdateResult = await usersCollection.updateOne(
      { _id: userObjectId },
      { 
        $set: { 
          hasPurchasedTicket: true,
          ticketExpiry: expiryDate,
          ticketId: ticketResult.insertedId
        } 
      }
    );
    
    console.log('User update result:', userUpdateResult);
    
    if (userUpdateResult.modifiedCount === 0) {
      console.error('Failed to update user with ticket information');
      return NextResponse.json(
        { error: 'Failed to update user with ticket information' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Ticket purchased successfully',
      ticketId: ticketResult.insertedId.toString(),
      expiryDate: expiryDate
    });
  } catch (error) {
    console.error('Ticket purchase error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to purchase ticket' },
      { status: 500 }
    );
  }
}