import { NextResponse } from 'next/server';
import { getDocumentById, updateDocument, deleteDocument } from '../../../lib/db';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  try {
    const id = params.id;
    const artifact = await getDocumentById('artifacts', new ObjectId(id));
    
    if (!artifact) {
      return NextResponse.json(
        { error: 'Artifact not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(artifact);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch artifact' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const id = params.id;
    const data = await request.json();
    
    const result = await updateDocument('artifacts', new ObjectId(id), data);
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Artifact not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Artifact updated successfully' }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update artifact' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = params.id;
    
    const result = await deleteDocument('artifacts', new ObjectId(id));
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Artifact not found' },
        { status: 404 }
      );
    }
    
    // In a real app, update the gallery artifact count
    
    return NextResponse.json(
      { message: 'Artifact deleted successfully' }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete artifact' },
      { status: 500 }
    );
  }
}