import { requireValidTicket, requireAuth } from '@/lib/middleware/auth';
import { handleGetArtifactsByGallery } from '@/core/controllers/artifactController';

export async function GET(req) {
    // Try ticket validation first
    const ticketResult = await requireValidTicket(req);

    // If valid ticket, proceed
    if (ticketResult.authorized) {
        const { user, ticket } = ticketResult;
        const { searchParams } = new URL(req.url);
        const gallery = searchParams.get('gallery');

        if (!gallery) {
            return new Response(JSON.stringify({
                success: false,
                message: 'Gallery name is required.',
            }), { status: 400 });
        }

        const reqWithExtras = {
            ...req,
            user,
            ticket,
            query: { gallery },
        };

        return await handleGetArtifactsByGallery(reqWithExtras);
    }

    // If not authorized due to ticket, check if user is admin
    const authResult = await requireAuth(req);

    if (!authResult.authorized) {
        return new Response(JSON.stringify({
            success: false,
            message: ticketResult.error || 'Authorization required.',
        }), { status: ticketResult.status || 403 });
    }

    if (authResult.user.role !== 'admin') {
        return new Response(JSON.stringify({
            success: false,
            message: ticketResult.error || 'Valid ticket required.',
        }), { status: ticketResult.status || 403 });
    }

    // Admin override — proceed without ticket
    const { user } = authResult;
    const { searchParams } = new URL(req.url);
    const gallery = searchParams.get('gallery');

    if (!gallery) {
        return new Response(JSON.stringify({
            success: false,
            message: 'Gallery name is required.',
        }), { status: 400 });
    }

    const reqWithExtras = {
        ...req,
        user,
        query: { gallery },
    };

    return await handleGetArtifactsByGallery(reqWithExtras);
}
