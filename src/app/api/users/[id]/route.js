import { deleteUserController, updateUserController } from '@/controllers/userController';

export async function DELETE(req, context) {
    return await deleteUserController(req, context);
}

export async function PUT(req, context) {
    return await updateUserController(req, context);
}
