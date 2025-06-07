import { verifyToken } from './jwt';
import { connectToDatabase } from '@/lib/mongoose';
import User from '@/core/models/userModel';

// --- requireAuth ---
export async function requireAuth(req) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      authorized: false,
      error: 'Missing or invalid Authorization header',
      status: 401,
    };
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return {
      authorized: false,
      error: 'Invalid or expired token',
      status: 401,
    };
  }

  return {
    authorized: true,
    user: decoded,
  };
}

// --- requireAdmin ---
export async function requireAdmin(req) {
  const authResult = await requireAuth(req);

  if (!authResult.authorized) {
    return authResult;
  }

  const { user } = authResult;

  if (user.role !== 'admin') {
    return {
      authorized: false,
      error: 'Forbidden: Admins only',
      status: 403,
    };
  }

  return {
    authorized: true,
    user,
  };
}

// --- requireValidTicket ---
export async function requireValidTicket(req) {
  const authResult = await requireAuth(req);

  if (!authResult.authorized) {
    return authResult;
  }

  const { user } = authResult;

  await connectToDatabase();
  const dbUser = await User.findById(user.id).populate('ticket');

  if (!dbUser || !dbUser.ticket) {
    return {
      authorized: false,
      error: 'No ticket associated with user.',
      status: 403,
    };
  }

  const now = new Date();
  const validUntil = new Date(dbUser.ticket.validUntil);

  if (validUntil < now) {
    return {
      authorized: false,
      error: 'Ticket has expired.',
      status: 403,
    };
  }

  return {
    authorized: true,
    user,
    ticket: dbUser.ticket,
  };
}

