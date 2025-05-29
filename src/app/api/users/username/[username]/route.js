import { getUserByUsernameController } from '@/core/controllers/userController';
import { requireAdmin } from '@/lib/middleware/auth';

export async function GET(req, context) {
  const { authorized, error, status, user } = await requireAdmin(req);

  if (!authorized) {
    return new Response(JSON.stringify({
      success: false,
      message: error || 'Access denied.'
    }), { status: status || 403 });
  }

  return await getUserByUsernameController(req, context);
}
