import { Router } from 'express';
import { deleteUserService, updateUserService } from './user.service.js';

export const userRouter = Router();

userRouter.patch('/', updateUserService);

userRouter.delete('/', deleteUserService);

userRouter.get('/', () => {});
