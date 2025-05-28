import { loginController } from '@/controllers/authController';

export async function POST(req) {
  return await loginController(req);
}
