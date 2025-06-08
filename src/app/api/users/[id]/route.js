import {
  deleteUserController,
  updateUserController,
} from '@/core/controllers/userController';

import { requireAdmin } from '@/lib/middleware/auth';
import { requireAuth } from '@/lib/middleware/auth';

export async function DELETE(req, context) {
  const { authorized, error, status } = await requireAdmin(req);

  if (!authorized) {
    return new Response(JSON.stringify({
      success: false,
      message: error || 'Access denied.'
    }), { status: status || 403 });
  }

  return await deleteUserController(req, context);
}

export async function PUT(req, contextPromise) {
  const context = await contextPromise; // ✅ await context
  const { user, authorized, error, status } = await requireAuth(req);

  if (!authorized) {
    return new Response(JSON.stringify({
      success: false,
      message: error || 'Unauthorized.',
    }), { status: status || 401 });
  }

  const userIdToUpdate = context.params.id;

  const isAdmin = user.role === 'admin';
  const isSelf = user.id === userIdToUpdate;

  if (!isAdmin && !isSelf) {
    return new Response(JSON.stringify({
      success: false,
      message: 'You can only update your own profile.',
    }), { status: 403 });
  }

  return await updateUserController(req, context);
}