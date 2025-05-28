import { deleteUserController, updateUserController } from '@/core/controllers/userController';

export async function DELETE(req, context) {
    return await deleteUserController(req, context);
}

export async function PUT(req, context) {
    return await updateUserController(req, context);
}
