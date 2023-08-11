import { Router } from 'express';
import { catchError } from '../utils/errors/catchError.util';
import { topicsController } from '../controllers/topics.controller';
import { authMiddleware } from '../middlwares/auth.middleware';
import { restrictToAdminMiddleware } from '../middlwares/restrictToAdmin.middleware';

export const topicsRouter = Router();

topicsRouter.use(authMiddleware);

topicsRouter.get('/', catchError(topicsController.getAll));
topicsRouter.get('/:id', catchError(topicsController.getById));

topicsRouter.use(restrictToAdminMiddleware);

topicsRouter.post('/', catchError(topicsController.create));
topicsRouter.patch('/:id', catchError(topicsController.update));
topicsRouter.delete('/:id', catchError(topicsController.remove));
