import { NextResponse } from 'next/server';
import {
    handleCreateArtifact,
    handleGetAllArtifacts,
} from '@/core/controllers/artifactController';

export async function GET(req) {
    const res = {
        status: (code) => ({
            json: (body) => NextResponse.json(body, { status: code }),
        }),
    };

    return await handleGetAllArtifacts(req, res);
}

export async function POST(req) {
    const body = await req.json();
    const reqWithBody = { ...req, body };
    const res = {
        status: (code) => ({
            json: (body) => NextResponse.json(body, { status: code }),
        }),
    };

    return await handleCreateArtifact(reqWithBody, res);
}
