const BASE_URL = '/api/ticket';

function getAuthHeaders(token) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

async function handleResponse(res) {
  const data = await res.json();

  if (res.ok) return data.data ?? data;

  // Use server message directly
  const message = data.message || 'Something went wrong.';
  throw new Error(message);
}

// ✅ Purchase ticket (requires login)
export async function purchaseTicket(token) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: getAuthHeaders(token),
  });

  const ticket = await handleResponse(res);

  return {
    id: ticket._id,
    validUntil: ticket.validUntil,
    createdAt: ticket.createdAt,
  };
}

// ✅ Get current user's ticket (requires login)
export async function fetchUserTicket(token) {
  const res = await fetch(BASE_URL, {
    method: 'GET',
    headers: getAuthHeaders(token),
  });

  const ticket = await handleResponse(res);

  return {
    id: ticket._id,
    validUntil: ticket.validUntil,
    createdAt: ticket.createdAt,
  };
}
