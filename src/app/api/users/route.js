import { getAllUsersController } from '@/core/controllers/userController';
import { requireAdmin } from '@/lib/middleware/auth';

export async function GET(req) {
  const { authorized, error, status } = await requireAdmin(req);

  if (!authorized) {
    return new Response(JSON.stringify({
      success: false,
      message: error || 'Access denied.'
    }), { status: status || 403 });
  }

  return await getAllUsersController();
}
