import { loginController } from '@/core/controllers/authController';
import { saveUserSession } from '@/utils/sessionStorageHandler';

export async function POST(req) {
  return await loginController(req);
}

const res = await fetch('/api/auth', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password }),
});

const data = await res.json();

if (data.success && data.user?.token) {
  // ✅ This correctly saves the user object with the token inside
  saveUserSession(data.user, data.user.token);
}
