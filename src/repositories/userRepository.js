import { connectToDatabase } from '@/lib/mongoose';
import User from '@/models/userModel';

// Create a new user
export async function createUser(userData) {
  try {
    await connectToDatabase();

    const newUser = new User({
      fullName: userData.fullName,
      email: userData.email,
      username: userData.username,
      password: `hashed_${userData.password}`, // For demo only
      role: userData.role || 'visitor',
      hasPurchasedTicket: false,
      createdAt: new Date(),
    });

    return await newUser.save();
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
}

// Get user by username
export async function getUserByUsername(username) {
  try {
    await connectToDatabase();
    return await User.findOne({ username });
  } catch (error) {
    console.error('Error fetching user by username:', error);
    throw new Error('Failed to fetch user by username');
  }
}

// Get all users
export async function getAllUsers() {
  try {
    await connectToDatabase();
    return await User.find();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
}

// Delete user by ID
export async function deleteUserById(userId) {
  try {
    await connectToDatabase();
    return await User.findByIdAndDelete(userId);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user');
  }

  
}

// Update user by ID
export async function updateUserById(userId, updateData) {
    try {
      await connectToDatabase();
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true } // return updated doc
      );
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user');
    }
}
  
