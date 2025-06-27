import { getGalleryViewsSummaryService } from '@/core/services/artifactService';

export async function GET() {
    const data = await getGalleryViewsSummaryService();
    return Response.json(data);
}
