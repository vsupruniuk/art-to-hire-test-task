import { NextFunction, Request, Response } from 'express';

export const catchError = (action: (req: Request, res: Response, next: NextFunction) => any) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await action(req, res, next);
		} catch (error) {
			next(error);
		}
	};
};
