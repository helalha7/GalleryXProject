import {
    deleteUserController,
    updateUserController,
  } from '@/core/controllers/userController';
  
  import { requireAdmin } from '@/lib/middleware/auth';
  
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
  
  export async function PUT(req, context) {
    const { authorized, error, status } = await requireAdmin(req);
  
    if (!authorized) {
      return new Response(JSON.stringify({
        success: false,
        message: error || 'Access denied.'
      }), { status: status || 403 });
    }
  
    return await updateUserController(req, context);
  }
  