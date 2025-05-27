import { NextResponse } from 'next/server';
import { clearSession } from '../../../lib/auth';
import { redirect } from 'next/navigation';

export async function GET() {
  // Clear the session cookie
  clearSession();
  
  // Redirect to the home page
  return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));
}