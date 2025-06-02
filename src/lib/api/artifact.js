const BASE_URL = '/api/artifact';

function getAuthHeaders(token) {
    return {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
    };
}

async function handleResponse(res) {
    const data = await res.json();

    if (res.ok) return data.data ?? data;

    const message = data.message || data.error || 'Unexpected error occurred.';
    throw new Error(message);
}

// ✅ Get all artifacts
export async function fetchAllArtifacts() {
    const res = await fetch(BASE_URL, {
        method: 'GET',
        headers: getAuthHeaders(),
    });

    return await handleResponse(res);
}

// ✅ Get artifacts by gallery name
export async function fetchArtifactsByGallery(galleryName) {
    const res = await fetch(`${BASE_URL}/gallery?gallery=${encodeURIComponent(galleryName)}`, {
        method: 'GET',
        headers: getAuthHeaders(),
    });

    return await handleResponse(res);
}

// ✅ Increment views by artifact name
export async function incrementArtifactViewsByName(name) {
    const res = await fetch(`${BASE_URL}/views?name=${encodeURIComponent(name)}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
    });

    return await handleResponse(res);
}

// ✅ Create a new artifact (admin only)
export async function createArtifact(data, token) {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify(data),
    });

    return await handleResponse(res);
}
