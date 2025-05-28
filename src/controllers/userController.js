import {
    registerUserService,
    getUserByUsernameService,
    getAllUsersService,
    deleteUserByIdService,
    updateUserByIdService,
} from '@/services/userService';

// POST /api/users
export async function registerUserController(req) {
    try {
        const userData = await req.json();

        // ✅ Validate role before proceeding
        const validRoles = ['visitor', 'admin'];
        if (userData.role && !validRoles.includes(userData.role)) {
            return new Response(JSON.stringify({ error: 'Invalid role. Allowed roles: visitor, admin.' }), {
                status: 400
            });
        }

        const user = await registerUserService(userData);
        return new Response(JSON.stringify(user), { status: 201 });

    } catch (error) {
        console.error('Controller Error - registerUserController:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}


// GET /api/users
export async function getAllUsersController() {
    try {
        const users = await getAllUsersService();
        return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
        console.error('Controller Error - getAllUsersController:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}


// GET /api/users/username/[username]
export async function getUserByUsernameController(_, { params }) {
    try {
        const user = await getUserByUsernameService(params.username);
        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.error('Controller Error - getUserByUsernameController:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

// DELETE /api/users/[id]
export async function deleteUserController(_, { params }) {
    try {
        const deletedUser = await deleteUserByIdService(params.id);
        if (!deletedUser) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }
        return new Response(JSON.stringify({ message: 'User deleted successfully' }), { status: 200 });
    } catch (error) {
        console.error('Controller Error - deleteUserController:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}


export async function updateUserController(req, { params }) {
    try {
        const updateData = await req.json();

        // ✅ Validate role before updating
        const validRoles = ['visitor', 'admin'];
        if (updateData.role && !validRoles.includes(updateData.role)) {
            return new Response(JSON.stringify({ error: 'Invalid role. Allowed roles: visitor, admin.' }), {
                status: 400
            });
        }

        const updatedUser = await updateUserByIdService(params.id, updateData);

        if (!updatedUser) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(updatedUser), { status: 200 });

    } catch (error) {
        console.error('Controller Error - updateUserController:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}


