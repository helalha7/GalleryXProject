import {
    getGalleryController,
    updateGalleryController,
    deleteGalleryController
} from '@/core/controllers/galleryController';
import { requireAdmin } from '@/lib/middleware/auth';

export async function GET(req, context) {
    
    return getGalleryController(req, context);
}

export async function PATCH(req, context) {
    const auth = await requireAdmin(req);
    if (!auth.authorized) {
        return new Response(JSON.stringify({ success: false, message: auth.error }), { status: auth.status });
    }

    return updateGalleryController(req, context);
}

export async function DELETE(req, context) {
    const auth = await requireAdmin(req);
    if (!auth.authorized) {
        return new Response(JSON.stringify({ success: false, message: auth.error }), { status: auth.status });
    }

    return deleteGalleryController(req, context);
}
