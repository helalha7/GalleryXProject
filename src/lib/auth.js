import { getCollection } from './db';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Hash a password (in a real app, use bcrypt or similar)
 * Note: For simplicity we're not using real hashing in this demo
 * In a production app, always use proper password hashing
 */
export function hashPassword(password) {
  // Simple demonstration - NOT secure for production
  // In a real app, use: return bcrypt.hashSync(password, 10);
  return `hashed_${password}`;
}

/**
 * Verify a password (in a real app, use bcrypt or similar)
 */
export function verifyPassword(password, hashedPassword) {
  // Simple demonstration - NOT secure for production
  // In a real app, use: return bcrypt.compareSync(password, hashedPassword);
  console.log(`Comparing: ${password}, ${hashedPassword}`);
  return hashedPassword === `hashed_${password}` || password === hashedPassword;
}

/**
 * Create a new user
 * @param {Object} userData - User data (fullName, email, username, password, role)
 * @returns {Promise<Object>} Created user
 */
export async function createUser(userData) {
  try {
    console.log('Creating user:', userData);
    const collection = await getCollection('users');
    
    // Check if username or email already exists
    const existingUser = await collection.findOne({
      $or: [
        { username: userData.username },
        { email: userData.email }
      ]
    });
    
    if (existingUser) {
      console.log('User already exists:', existingUser);
      throw new Error('Username or email already exists');
    }
    
    // Hash the password
    const hashedPassword = hashPassword(userData.password);
    
    // Create the user
    const newUser = {
      ...userData,
      password: hashedPassword,
      createdAt: new Date()
    };
    
    console.log('Inserting new user:', newUser);
    const result = await collection.insertOne(newUser);
    console.log('User created with ID:', result.insertedId);
    
    return result;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

/**
 * Authenticate a user
 * @param {string} username - Username
 * @param {string} password - Password
 * @returns {Promise<Object>} User object (without password)
 */
export async function authenticateUser(username, password) {
  try {
    console.log(`Authenticating user: ${username}`);
    const collection = await getCollection('users');
    
    // Find the user
    const user = await collection.findOne({ username });
    
    console.log('Found user:', user);
    
    if (!user) {
      console.log('User not found');
      throw new Error('User not found');
    }
    
    // Verify password
    const isPasswordValid = verifyPassword(password, user.password);
    console.log('Password valid:', isPasswordValid);
    
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    
    // Don't return the password
    const { password: _, ...userWithoutPassword } = user;
    
    return userWithoutPassword;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
}

/**
 * Create a session cookie
 * @param {Object} user - User object
 */
export function createSessionCookie(user) {
  // In a real app, use a secure session system
  // This is a simplified example
  const session = {
    userId: user._id.toString(),
    username: user.username,
    role: user.role,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  };
  
  // Set the session cookie
  cookies().set('session', JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/'
  });
  
  return session;
}

/**
 * Get the current session
 * @returns {Object|null} Session object or null
 */
export function getSession() {
  const sessionCookie = cookies().get('session');
  
  if (!sessionCookie) {
    return null;
  }
  
  try {
    return JSON.parse(sessionCookie.value);
  } catch (error) {
    return null;
  }
}

/**
 * Get the current user from the session
 * @returns {Promise<Object|null>} User object or null
 */
export async function getCurrentUser() {
  const session = getSession();
  
  if (!session || !session.userId) {
    return null;
  }
  
  const collection = await getCollection('users');
  const user = await collection.findOne({ _id: session.userId });
  
  if (!user) {
    return null;
  }
  
  // Don't return the password
  const { password: _, ...userWithoutPassword } = user;
  
  return userWithoutPassword;
}

/**
 * Clear the session cookie (logout)
 */
export function clearSession() {
  cookies().delete('session');
}

/**
 * Check if the user is authenticated
 * Redirects to login if not
 */
export async function requireAuth() {
  const session = getSession();
  
  if (!session) {
    redirect('/login');
  }
  
  return session;
}

/**
 * Check if the user is an admin
 * Redirects to home if not
 */
export async function requireAdmin() {
  const session = getSession();
  
  if (!session || session.role !== 'admin') {
    redirect('/');
  }
  
  return session;
}