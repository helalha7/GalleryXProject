import { NextResponse } from 'next/server';
import { handleGetArtifactsByGallery } from '@/core/controllers/artifactController';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const gallery = searchParams.get('gallery');

    const res = {
        status: (code) => ({
            json: (body) => NextResponse.json(body, { status: code }),
        }),
    };

    return await handleGetArtifactsByGallery({ query: { gallery } }, res);
}
