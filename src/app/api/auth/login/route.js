import { loginController } from '@/core/controllers/authController';

export async function POST(req) {
  return await loginController(req);
}
