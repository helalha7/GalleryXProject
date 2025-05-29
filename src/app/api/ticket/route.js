import { requireAuth } from '@/lib/middleware/auth';
import {
    purchaseTicketController,
    getTicketController,
} from '@/core/controllers/ticketController';

export async function POST(req) {
    const result = await requireAuth(req);
    if (!result.authorized) {
        return new Response(JSON.stringify({ error: result.error }), { status: 401 });
    }

    // Inject user into the request
    req.user = result.user;
    return await purchaseTicketController(req);
}

export async function GET(req) {
    const result = await requireAuth(req);
    if (!result.authorized) {
        return new Response(JSON.stringify({ error: result.error }), { status: 401 });
    }

    req.user = result.user;
    return await getTicketController(req);
}
