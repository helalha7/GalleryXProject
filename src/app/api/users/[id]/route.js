import {
  deleteUserController,
  updateUserController,
} from '@/core/controllers/userController';

import { requireAdmin, requireAuth } from '@/lib/middleware/auth';

// DELETE - Admins only
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

// PUT - Update profile (self or admin)
export async function PUT(req, contextPromise) {
  const context = await contextPromise;
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

  // ✅ Continue to update
  try {
    return await updateUserController(req, context);
  } catch (err) {
    console.error('Update failed:', err);
    return new Response(JSON.stringify({
      success: false,
      message: 'Server error while updating user.',
    }), { status: 500 });
  }
}
