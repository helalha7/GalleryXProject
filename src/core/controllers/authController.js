import { registerService, loginService } from '@/core/services/authService';
import { generateToken } from '@/lib/middleware/jwt';

// ✅ Register Controller
export async function registerController(req) {
  try {
    const userData = await req.json();

    const validRoles = ['visitor', 'admin'];
    if (userData.role && !validRoles.includes(userData.role)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid role. Allowed: visitor or admin.' }),
        { status: 400 }
      );
    }

    const result = await registerService(userData);

    if (!result.success && result.reason === 'username_exists') {
      return new Response(
        JSON.stringify({ success: false, message: 'Username already exists.' }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: result.user }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Register Error:', error.message);
    return new Response(
      JSON.stringify({ success: false, message: 'Registration failed.' }),
      { status: 500 }
    );
  }
}

// ✅ Login Controller
export async function loginController(req) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return new Response(
        JSON.stringify({ success: false, message: 'Username and password are required.' }),
        { status: 400 }
      );
    }

    const user = await loginService(username, password);

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid username or password.' }),
        { status: 401 }
      );
    }

    const token = generateToken(user);

    // ✅ Format to match what the frontend expects
    return new Response(
      JSON.stringify({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          token: token,
        }
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Login Error:', error.message);
    return new Response(
      JSON.stringify({ success: false, message: 'Internal server error.' }),
      { status: 500 }
    );
  }
}


