import { connectToDatabase } from '@/lib/mongoose';
import User from '@/core/models/userModel';

// Create a new user
export async function createUser(userData) {
  await connectToDatabase();

  const newUser = new User({
    fullName: userData.fullName,
    email: userData.email,
    username: userData.username,
    password: `hashed_${userData.password}`, // For demo only
    role: userData.role || 'visitor',
    createdAt: new Date(),
  });

  return await newUser.save();
}

// Get user by username
export async function getUserByUsername(username) {
  await connectToDatabase();
  return await User.findOne({ username });
}

// Get all users
export async function getAllUsers() {
  await connectToDatabase();
  return await User.find();
}

// Delete user by ID
export async function deleteUserById(userId) {
  await connectToDatabase();
  return await User.findByIdAndDelete(userId);
}

// Update user by ID
export async function updateUserById(userId, updateData) {
  await connectToDatabase();
  return await User.findByIdAndUpdate(userId, { $set: updateData }, { new: true });
}
