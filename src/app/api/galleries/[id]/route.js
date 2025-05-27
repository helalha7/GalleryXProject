import { NextResponse } from 'next/server';
import { getDocumentById, updateDocument, deleteDocument, getCollection } from '../../../lib/db';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  try {
    const id = params.id;
    
    // Get gallery collection
    const galleriesCollection = await getCollection('galleries');
    
    // Try to find by MongoDB ObjectId first
    let gallery;
    try {
      gallery = await galleriesCollection.findOne({ _id: new ObjectId(id) });
    } catch (error) {
      // If not a valid ObjectId, try other fields
      gallery = await galleriesCollection.findOne({
        $or: [
          { _id: id }, // String ID
          { name: id }  // Gallery name
        ]
      });
    }
    
    if (!gallery) {
      return NextResponse.json(
        { error: 'Gallery not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(gallery);
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const id = params.id;
    const data = await request.json();
    
    // Update timestamps
    const updateData = {
      ...data,
      lastUpdated: new Date()
    };
    
    const result = await updateDocument('galleries', new ObjectId(id), updateData);
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Gallery not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Gallery updated successfully' }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update gallery' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = params.id;
    
    // In a real app, you would also need to handle artifacts in this gallery
    
    const result = await deleteDocument('galleries', new ObjectId(id));
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Gallery not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Gallery deleted successfully' }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete gallery' },
      { status: 500 }
    );
  }
}