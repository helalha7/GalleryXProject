import { registerService, loginService } from '@/core/services/authService';

export async function registerController(req) {
  try {
    const userData = await req.json();

    const validRoles = ['visitor', 'admin'];
    if (userData.role && !validRoles.includes(userData.role)) {
      return new Response(JSON.stringify({ error: 'Invalid role. Must be visitor or admin' }), { status: 400 });
    }

    const user = await registerService(userData);
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}

export async function loginController(req) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return new Response(JSON.stringify({ error: 'Username and password are required' }), { status: 400 });
    }

    const user = await loginService(username, password);
    return new Response(JSON.stringify({ success: true, user }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 401 });
  }
}
