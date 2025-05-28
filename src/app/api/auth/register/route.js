import { registerController } from '@/controllers/authController';

export async function POST(req) {
    return await registerController(req);
}
