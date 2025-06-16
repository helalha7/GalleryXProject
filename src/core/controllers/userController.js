import {
  getUserByUsernameService,
  getAllUsersService,
  deleteUserByIdService,
  updateUserByIdService,
} from '@/core/services/userService';

// ✅ GET /api/users
export async function getAllUsersController() {
  try {
    const users = await getAllUsersService();
    return new Response(
      JSON.stringify({ success: true, data: users }),
      { status: 200 }
    );
  } catch (error) {
    console.error('getAllUsersController Error:', error.message);
    return new Response(
      JSON.stringify({ success: false, message: 'Unable to fetch users. Please try again later.' }),
      { status: 500 }
    );
  }
}

// ✅ GET /api/users/username/[username]
export async function getUserByUsernameController(_, { params }) {
  try {
    const user = await getUserByUsernameService(params.username);

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: 'This user does not exist.' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: user }),
      { status: 200 }
    );
  } catch (error) {
    console.error('getUserByUsernameController Error:', error.message);
    return new Response(
      JSON.stringify({ success: false, message: 'Failed to retrieve user data. Please try again.' }),
      { status: 500 }
    );
  }
}

// ✅ DELETE /api/users/[id]
export async function deleteUserController(_, { params }) {
  try {
    const deletedUser = await deleteUserByIdService(params.id);

    if (!deletedUser) {
      return new Response(
        JSON.stringify({ success: false, message: 'User not found or already deleted.' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'User deleted successfully.' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('deleteUserController Error:', error.message);
    return new Response(
      JSON.stringify({ success: false, message: 'Could not delete user. Please try again.' }),
      { status: 500 }
    );
  }
}

// ✅ PUT /api/users/[id]
export async function updateUserController(req, { params }) {
  try {
    const updateData = await req.json();

    const { fullName, email, username, role, currentPassword, newPassword } = updateData;

    // Role validation (only allowed values)
    const validRoles = ['visitor', 'admin'];
    if (role && !validRoles.includes(role)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid role. Choose either visitor or admin.' }),
        { status: 400 }
      );
    }

    // Build the data to pass down to the service
    const safeUpdateData = {
      ...(fullName && { fullName }),
      ...(email && { email }),
      ...(username && { username }),
      ...(role && { role }), // ← ADD THIS LINE
    };


    // Include password fields if provided
    if (currentPassword && newPassword) {
      safeUpdateData.currentPassword = currentPassword;
      safeUpdateData.newPassword = newPassword;
    }

    const updatedUser = await updateUserByIdService(params.id, safeUpdateData);

    if (!updatedUser) {
      return new Response(
        JSON.stringify({ success: false, message: 'User not found or update failed.' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: updatedUser }),
      { status: 200 }
    );
  } catch (error) {
    console.error('updateUserController Error:', error.message);

    const errorMessage = error.message?.includes('Current password is incorrect')
      ? 'Current password is incorrect.'
      : 'Could not update user. Please try again later.';

    return new Response(
      JSON.stringify({ success: false, message: errorMessage }),
      { status: 500 }
    );
  }
}

