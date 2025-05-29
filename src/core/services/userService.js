import {
    getUserByUsername,
    getAllUsers,
    deleteUserById,
    updateUserById,
  } from '@/core/repositories/userRepository';
  
  // ✅ Get one user by username
  export async function getUserByUsernameService(username) {
    return await getUserByUsername(username); // return null if not found
  }
  
  // ✅ Get all users
  export async function getAllUsersService() {
    return await getAllUsers(); // return []
  }
  
  // ✅ Delete user by ID
  export async function deleteUserByIdService(userId) {
    return await deleteUserById(userId); // return deleted user or null
  }
  
  // ✅ Update user by ID
  export async function updateUserByIdService(userId, updateData) {
    return await updateUserById(userId, updateData); // return updated user or null
  }
  