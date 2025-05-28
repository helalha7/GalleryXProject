import { registerController } from '@/core/controllers/authController';

export async function POST(req) {
    return await registerController(req);
}
