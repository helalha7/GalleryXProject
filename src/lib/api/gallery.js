const BASE_URL = '/api/galleries';

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

// ✅ Get all galleries (public)
export async function fetchAllGalleries() {
    const res = await fetch(BASE_URL, { method: 'GET' });
    return await handleResponse(res);
}

// ✅ Get gallery by ID (admin only)
export async function fetchGalleryById(id, token) {
    console.log('i am here');
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'GET',
        headers: getAuthHeaders(token),
    });

    return await handleResponse(res);
}

// ✅ Create a new gallery (admin only)
export async function createGallery(data, token) {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify(data),
    });

    return await handleResponse(res);
}

// ✅ Update a gallery (admin only)
export async function updateGallery(id, data, token) {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(token),
        body: JSON.stringify(data),
    });

    return await handleResponse(res);
}

// ✅ Delete a gallery (admin only)
export async function deleteGallery(id, token) {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(token),
    });

    return await handleResponse(res);
}
