import { requireAdmin, requireValidTicket } from '@/lib/middleware/auth';
import {
    handleGetAllArtifacts,
    handleCreateArtifact,
} from '@/core/controllers/artifactController';

export async function GET(req) {
    const { authorized, user, ticket, error, status } = await requireValidTicket(req);

    if (!authorized) {
        return new Response(JSON.stringify({
            success: false,
            message: error || 'Access denied. Valid ticket required.',
        }), { status: status || 403 });
    }

    req.user = user;
    req.ticket = ticket;

    return await handleGetAllArtifacts(req);
}

export async function POST(req) {
    const { authorized, user, error, status } = await requireAdmin(req);

    if (!authorized) {
        return new Response(JSON.stringify({
            success: false,
            message: error || 'Admins only.',
        }), { status: status || 403 });
    }

    const body = await req.json();
    const reqWithUserAndBody = { ...req, user, body };

    return await handleCreateArtifact(reqWithUserAndBody);
}
