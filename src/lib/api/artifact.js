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

// ✅ Get all artifacts (requires valid ticket)
export async function fetchAllArtifacts(token) {
    const res = await fetch(BASE_URL, {
        method: 'GET',
        headers: getAuthHeaders(token),
    });

    return await handleResponse(res);
}

// ✅ Get artifacts by gallery name (requires valid ticket)
export async function fetchArtifactsByGallery(galleryName, token) {
    if (!galleryName) throw new Error('galleryName is required');
    const url = `${BASE_URL}/gallery?gallery=${encodeURIComponent(galleryName.toUpperCase())}`;
    const res = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(token),
    });
    return await handleResponse(res);
}

// ✅ Increment views by artifact name (requires valid ticket)
export async function incrementArtifactViewsByName(name, token) {
    if (!name) throw new Error('artifact name is required');

    const url = `${BASE_URL}/views?name=${encodeURIComponent(name)}`;
    const res = await fetch(url, {
        method: 'PATCH',
        headers: getAuthHeaders(token),
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

// ✅ Update an existing artifact by ID (admin only)
export async function updateArtifact(id, data, token) {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(token),
        body: JSON.stringify(data),
    });

    return await handleResponse(res);
}

// ✅ Delete an artifact by ID (admin only)
export async function deleteArtifact(id, token) {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(token),
    });

    return await handleResponse(res);
}
