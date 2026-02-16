import { Router } from 'express';
import { updateUserService } from './user.service';

export const userRouter = Router();

userRouter.patch('/', updateUserService);

userRouter.delete('/', () => {});

userRouter.get('/', () => {});
