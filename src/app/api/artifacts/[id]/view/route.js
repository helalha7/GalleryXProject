import { NextResponse } from 'next/server';
import { incrementField } from '../../../../lib/db';
import { ObjectId } from 'mongodb';

export async function POST(request, { params }) {
  try {
    const id = params.id;
    
    // Increment the view count
    const result = await incrementField('artifacts', new ObjectId(id), 'views', 1);
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Artifact not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'View count updated' }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update view count' },
      { status: 500 }
    );
  }
}