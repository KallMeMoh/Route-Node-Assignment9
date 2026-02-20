import { Router } from 'express';
import {
  deleteUserService,
  getUserService,
  updateUserService,
} from './user.service.js';

export const userRouter = Router();

userRouter.patch('/', updateUserService);

userRouter.delete('/', deleteUserService);

userRouter.get('/', getUserService);
