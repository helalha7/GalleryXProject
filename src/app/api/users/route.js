import {
    registerUserController,
    getAllUsersController
  } from '@/controllers/userController';
  
  export async function POST(req) {
    return await registerUserController(req);
  }
  
  export async function GET() {
    return await getAllUsersController();
  }
  