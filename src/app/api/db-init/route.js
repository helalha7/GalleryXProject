import { NextResponse } from 'next/server';
import { initializeDatabase } from '../../../lib/db-init';

export async function GET() {
  try {
    const result = await initializeDatabase();
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message
      });
    } else {
      return NextResponse.json({
        success: false,
        message: result.message
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in db-init route:', error);
    return NextResponse.json({
      success: false,
      message: `Database initialization failed: ${error.message}`
    }, { status: 500 });
  }
}