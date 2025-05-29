import { getUserByUsername, createUser } from '@/core/repositories/userRepository';

// ✅ Register Service: returns { success: false, reason: 'exists' } if user exists
export async function registerService(userData) {
  const existingUser = await getUserByUsername(userData.username);
  if (existingUser) return { success: false, reason: 'username_exists' };

  const newUser = await createUser(userData);
  return { success: true, user: newUser };
}

// ✅ Login Service: returns user object or null
export async function loginService(username, password) {
  const user = await getUserByUsername(username);
  if (!user) return null;

  const expectedPassword = `hashed_${password}`;
  if (user.password !== expectedPassword) return null;

  const { password: _, ...userData } = user._doc;
  return userData;
}
