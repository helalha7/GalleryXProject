import { getUserByUsername, createUser } from '@/repositories/userRepository';

export async function registerService(userData) {
    try {
        const existingUser = await getUserByUsername(userData.username);
        if (existingUser) throw new Error('Username already exists');

        return await createUser(userData);
    } catch (error) {
        throw error;
    }
}

export async function loginService(username, password) {
    try {
        const user = await getUserByUsername(username);
        if (!user) throw new Error('User not found');

        const expectedPassword = `hashed_${password}`;
        if (user.password !== expectedPassword) throw new Error('Invalid password');

        const { password: _, ...userData } = user._doc;
        return userData;
    } catch (error) {
        throw error;
    }
}
