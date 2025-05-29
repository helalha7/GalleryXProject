const BASE_URL = '/api/users';

function getAuthHeaders(token) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

async function handleResponse(res) {
  const data = await res.json();

  if (res.ok) return data.data ?? data;

  // Use message directly from backend
  const message = data.message || data.error || 'Unexpected error occurred.';
  throw new Error(message);
}

// ✅ Get all users (admin only)
export async function fetchAllUsers(token) {
  const users = await fetch(BASE_URL, {
    method: 'GET',
    headers: getAuthHeaders(token),
  }).then(handleResponse);

  return users.map(({ _id, fullName, email, username, role }) => ({
    _id,
    fullName,
    email,
    username,
    role,
  }));
}

// ✅ Get user by username (admin only)
export async function fetchUserByUsername(username, token) {
  const user = await fetch(`${BASE_URL}/username/${username}`, {
    method: 'GET',
    headers: getAuthHeaders(token),
  }).then(handleResponse);

  return {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    username: user.username,
    role: user.role,
  };
}

// ✅ Delete user by ID (admin only)
export async function deleteUser(id, token) {
  const result = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(token),
  }).then(handleResponse);

  return {
    message: result.message || 'User deleted successfully.',
  };
}

// ✅ Update user by ID (admin only)
export async function updateUser(id, updateData, token) {
  const updated = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(token),
    body: JSON.stringify(updateData),
  }).then(handleResponse);

  return {
    _id: updated._id,
    fullName: updated.fullName,
    email: updated.email,
    username: updated.username,
    role: updated.role,
  };
}
