import {
  getUserByUsername,
  getAllUsers,
  deleteUserById,
  updateUserById,
  updateUserByIdWithPasswordCheck,
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

// ✅ Update user by ID with optional password change
export async function updateUserByIdService(userId, updateData) {
  if (updateData.currentPassword && updateData.newPassword) {
    // Use secure password update version
    return await updateUserByIdWithPasswordCheck(userId, updateData);
  }

  // Use standard update
  return await updateUserById(userId, updateData);
}