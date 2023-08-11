import { NextFunction, Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { UserRoles } from '../types/enums/UserRoles';
import { ApiError } from '../exceptions/ApiError';

export const restrictToAdminMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	const { accessToken, refreshToken } = req.cookies;

	const userData = authService.verifyAuthentication(accessToken, refreshToken);

	if (userData?.role !== UserRoles.ADMINISTRATOR) {
		throw ApiError.Forbidden('User dont have permissions for this action');
	}

	next();
};
