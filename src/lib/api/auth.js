import { saveUserSession } from '@/utils/sessionStorageHandler';

const BASE_URL = '/api/auth';

function getHeaders() {
  return {
    'Content-Type': 'application/json',
  };
}

async function handleResponse(res) {
  const data = await res.json();

  if (res.ok) return data.data ?? data;

  const errorMessage = data.message || data.error || 'Something went wrong.';
  throw new Error(errorMessage);
}

// ✅ Login user
export async function login({ username, password }) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ username, password }),
  });

  const data = await handleResponse(res);

  // Save session
  saveUserSession(data.user, data.token);

  return data.user;
}

// ✅ Register user
export async function register(userData) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(userData),
  });

  return await handleResponse(res);
}
