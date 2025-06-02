import { NextResponse } from 'next/server';
import { handleIncrementArtifactViews } from '@/core/controllers/artifactController';

export async function PATCH(req) {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name');

    const res = {
        status: (code) => ({
            json: (body) => NextResponse.json(body, { status: code }),
        }),
    };

    return await handleIncrementArtifactViews({ query: { name } }, res);
}
