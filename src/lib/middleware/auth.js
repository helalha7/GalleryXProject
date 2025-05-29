import { verifyToken } from './jwt';

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

export async function requireAdmin(req) {
  const authResult = await requireAuth(req);

  if (!authResult.authorized) {
    return authResult; // already includes error + status (401)
  }

  if (authResult.user.role !== 'admin') {
    return {
      authorized: false,
      error: 'Forbidden: Admins only',
      status: 403,
    };
  }

  return {
    authorized: true,
    user: authResult.user,
  };
}
