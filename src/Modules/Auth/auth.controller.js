import { Router } from 'express';
import { loginService, registerService } from './auth.service.js';

export const authRouter = Router();

authRouter.post('/signup', registerService);

authRouter.post('/login', loginService);
