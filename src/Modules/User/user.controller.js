import { Router } from 'express';
import {
  deleteUserService,
  getUserServive,
  updateUserService,
} from './user.service.js';

export const userRouter = Router();

userRouter.patch('/', updateUserService);

userRouter.delete('/', deleteUserService);

userRouter.get('/', getUserServive);
