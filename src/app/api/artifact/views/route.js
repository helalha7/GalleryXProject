import { requireValidTicket } from '@/lib/middleware/auth';
import { handleIncrementArtifactViews } from '@/core/controllers/artifactController';

export async function PATCH(req) {
    const { authorized, user, ticket, error, status } = await requireValidTicket(req);

    if (!authorized) {
        return new Response(JSON.stringify({
            success: false,
            message: error || 'Valid ticket required.',
        }), { status: status || 403 });
    }

    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name');

    if (!name) {
        return new Response(JSON.stringify({
            success: false,
            message: 'Artifact name is required.',
        }), { status: 400 });
    }

    // Inject user and query into req
    const reqWithUserAndQuery = {
        ...req,
        user,
        ticket,
        query: { name },
    };

    return await handleIncrementArtifactViews(reqWithUserAndQuery);
}
