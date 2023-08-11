import { Router } from 'express';
import { usersController } from '../controllers/users.controller';
import { catchError } from '../utils/errors/catchError.util';
import { authMiddleware } from '../middlwares/auth.middleware';
import { restrictToAdminMiddleware } from '../middlwares/restrictToAdmin.middleware';

export const usersRoute = Router();

usersRoute.use(authMiddleware);
usersRoute.use(restrictToAdminMiddleware);

usersRoute.get('/', catchError(usersController.getAll));
usersRoute.get('/:id', catchError(usersController.getById));
usersRoute.post('/', catchError(usersController.create));
usersRoute.patch('/:id', catchError(usersController.update));
usersRoute.delete('/:id', catchError(usersController.remove));
