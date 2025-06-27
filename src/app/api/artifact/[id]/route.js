
import { handleUpdateArtifact, handleDeleteArtifact } from '@/core/controllers/artifactController';
import { requireAdmin } from '@/lib/middleware/auth';

export async function PATCH(req, context) {
    const auth = await requireAdmin(req);

    if (!auth.authorized) {
        return new Response(JSON.stringify({
            success: false,
            message: auth.error || 'Unauthorized',
        }), { status: auth.status || 403 });
    }

    return await handleUpdateArtifact(req, context);
}

export async function DELETE(req, context) {
    const auth = await requireAdmin(req);

    if (!auth.authorized) {
        return new Response(JSON.stringify({
            success: false,
            message: auth.error || 'Unauthorized',
        }), { status: auth.status || 403 });
    }

    return await handleDeleteArtifact(req, context);
}
