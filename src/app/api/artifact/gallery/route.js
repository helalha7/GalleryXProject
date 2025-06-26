import { requireValidTicket, requireAuth } from '@/lib/middleware/auth';
import { handleGetArtifactsByGallery } from '@/core/controllers/artifactController';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const gallery = searchParams.get('gallery');

    if (!gallery) {
        return new Response(JSON.stringify({
            success: false,
            message: 'Gallery name is required.',
        }), { status: 400 });
    }

    // Try ticket validation first
    const ticketResult = await requireValidTicket(req);

    if (ticketResult.authorized) {
        // ✅ Case: user has valid ticket
        const { user, ticket } = ticketResult;

        const reqWithExtras = {
            ...req,
            user,
            ticket,
            query: { gallery },
        };

        return await handleGetArtifactsByGallery(reqWithExtras);
    }

    // 🔁 Fallback: Check if the user is admin
    const authResult = await requireAuth(req);

    if (authResult.authorized && authResult.user.role === 'admin') {
        // ✅ Case: admin without ticket
        const reqWithExtras = {
            ...req,
            user: authResult.user,
            query: { gallery },
        };

        return await handleGetArtifactsByGallery(reqWithExtras);
    }

    // ❌ Case: not admin and no valid ticket
    return new Response(JSON.stringify({
        success: false,
        message: ticketResult.error || 'Valid ticket required or admin access only.',
    }), { status: ticketResult.status || 403 });
}
