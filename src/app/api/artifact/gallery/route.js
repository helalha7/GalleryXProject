import { requireValidTicket } from '@/lib/middleware/auth';
import { handleGetArtifactsByGallery } from '@/core/controllers/artifactController';

export async function GET(req) {
    const { authorized, user, ticket, error, status } = await requireValidTicket(req);

    if (!authorized) {
        return new Response(JSON.stringify({
            success: false,
            message: error || 'Valid ticket required.',
        }), { status: status || 403 });
    }

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
