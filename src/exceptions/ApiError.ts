import { Errors } from '../types/errors/TErrors';
import { removeNullableErrors } from '../utils/errors/removeNullableErrors.util';

export class ApiError extends Error {
	constructor(
		public status: number,
		public message: string,
		public errors: Errors = {},
	) {
		super(message);
	}

	static BadRequest(message: string, errors?: Errors): ApiError {
		return new ApiError(400, message, removeNullableErrors(errors || {}));
	}

	static Unauthorized(message = 'User is not authorized'): ApiError {
		return new ApiError(401, message);
	}

	static Forbidden(message: string): ApiError {
		return new ApiError(403, message);
	}

	static NotFound(message = 'Not Found'): ApiError {
		return new ApiError(404, message);
	}

	static UnprocessableEntity(message: string): ApiError {
		return new ApiError(422, message);
	}
}
