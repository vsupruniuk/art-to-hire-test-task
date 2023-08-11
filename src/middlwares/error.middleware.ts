import { ApiError } from '../exceptions/ApiError';
import { NextFunction, Request, Response } from 'express';
import { Statuses } from '../types/enums/Statuses';

export const errorMiddleware = (
	error: Record<string, string> | ApiError,
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	if (error instanceof ApiError) {
		const { status, message, errors } = error;

		res.status(status).send({
			status: Statuses.ERROR,
			message,
			errors,
		});

		return;
	}

	res.status(500).send({
		status: Statuses.ERROR,
		message: 'Unexpected error',
	});
};
