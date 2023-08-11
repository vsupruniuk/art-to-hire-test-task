import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { catchError } from '../utils/errors/catchError.util';

export const authRouter = Router();

authRouter.post('/api/login', catchError(authController.login));
authRouter.get('/api/logout', catchError(authController.logout));
authRouter.get('/api/refresh', catchError(authController.refresh));
