import { getUserByUsernameController } from '@/core/controllers/userController';

export async function GET(req, context) {
  return await getUserByUsernameController(req, context);
}
