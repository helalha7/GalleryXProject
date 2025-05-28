import {
    createUser,
    getUserByUsername,
    getAllUsers,
    deleteUserById,
    updateUserById,
} from '@/core/repositories/userRepository';



export async function registerUserService(userData) {
    try {
        return await createUser(userData);
    } catch (error) {
        console.error('Service Error - registerUserService:', error);
        throw new Error('Failed to register user');
    }
}


export async function getUserByUsernameService(username) {
    try {
        return await getUserByUsername(username);
    } catch (error) {
        console.error('Service Error - getUserByUsernameService:', error);
        throw new Error('Failed to get user by username');
    }
}

export async function getAllUsersService() {
    try {
        return await getAllUsers();
    } catch (error) {
        console.error('Service Error - getAllUsersService:', error);
        throw new Error('Failed to fetch all users');
    }
}

export async function deleteUserByIdService(userId) {
    try {
        return await deleteUserById(userId);
    } catch (error) {
        console.error('Service Error - deleteUserByIdService:', error);
        throw new Error('Failed to delete user');
    }
}


export async function updateUserByIdService(userId, updateData) {
    try {
        return await updateUserById(userId, updateData);
    } catch (error) {
        console.error('Service Error - updateUserByIdService:', error);
        throw new Error('Failed to update user');
    }
}

