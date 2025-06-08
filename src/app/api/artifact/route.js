import { requireAuth ,requireAdmin, requireValidTicket } from '@/lib/middleware/auth';
import {
    handleGetAllArtifacts,
    handleCreateArtifact,
} from '@/core/controllers/artifactController';


export async function GET(req) {
    // First check if user is authenticated
    const { authorized, user, error, status } = await requireAuth(req);

    if (!authorized) {
        return new Response(JSON.stringify({
            success: false,
            message: error || 'Unauthorized',
        }), { status: status || 401 });
    }

    // Allow access if user is an admin
    if (user.role === 'admin') {
        req.user = user;
        return await handleGetAllArtifacts(req);
    }

    // Otherwise, check if user has valid ticket
    const ticketCheck = await requireValidTicket(req);
    if (!ticketCheck.authorized) {
        return new Response(JSON.stringify({
            success: false,
            message: ticketCheck.error || 'Access denied. Valid ticket required.',
        }), { status: ticketCheck.status || 403 });
    }

    req.user = ticketCheck.user;
    req.ticket = ticketCheck.ticket;

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
