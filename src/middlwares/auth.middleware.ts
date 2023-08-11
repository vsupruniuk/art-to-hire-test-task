import { NextFunction, Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { ApiError } from '../exceptions/ApiError';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
	const { accessToken, refreshToken } = req.cookies;

	const userData = authService.verifyAuthentication(accessToken, refreshToken);

	if (!userData) {
		throw ApiError.Unauthorized();
	}

	next();
};
