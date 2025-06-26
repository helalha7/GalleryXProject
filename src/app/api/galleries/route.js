import { getGalleriesController, addGalleryController } from '@/core/controllers/galleryController';
import { requireAdmin } from '@/lib/middleware/auth';

export async function GET() {
    return getGalleriesController();
}

export async function POST(req) {
    const auth = await requireAdmin(req);
    if (!auth.authorized) {
        return new Response(JSON.stringify({ success: false, message: auth.error }), { status: auth.status });
    }

    return addGalleryController(req);
}
