import { NextFunction, Request, Response } from 'express';
import { usersService } from '../services/users.service';
import { Statuses } from '../types/enums/Statuses';
import { ApiError } from '../exceptions/ApiError';
import { IUserDTO } from '../types/dto/IUserDTO';
import { usersValidator } from '../validators/users.validator';
import { isValidationErrorsExist } from '../utils/errors/isValidationErrorsExist.util';
import { IQueryParams } from '../types/queryParams/IQueryParams';
import { queryParamsValidator } from '../validators/queryParams.validator';

const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const queryParams: IQueryParams = req.query;

	// Checking if query params passed correctly

	const errors = {
		orderByDate: queryParamsValidator.validateOrderBy(queryParams),
		dateFrom: queryParamsValidator.validateDateFrom(queryParams),
		dateTo: queryParamsValidator.validateDateTo(queryParams),
	};

	if (isValidationErrorsExist(errors)) {
		throw ApiError.BadRequest('Validation errors', errors);
	}

	const users = await usersService.getAll(queryParams);

	res.status(200).json({
		status: Statuses.SUCCESS,
		data: {
			data: users,
		},
	});
};

const getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const { id } = req.params;

	if (isNaN(Number(id))) {
		throw ApiError.BadRequest('Invalid id was passed');
	}

	const user = await usersService.getById(Number(id));

	if (!user) {
		throw ApiError.NotFound();
	}

	res.status(200).json({
		status: Statuses.SUCCESS,
		data: {
			data: user,
		},
	});
};

const create = async (
	req: Request<object, object, IUserDTO>,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	const userDTO = req.body;

	const errors = {
		login: usersValidator.validateLogin(userDTO),
		firstName: usersValidator.validateFirstName(userDTO),
		lastName: usersValidator.validateLastName(userDTO),
		role: usersValidator.validateRole(userDTO),
		password: usersValidator.validatePassword(userDTO),
		department: usersValidator.validateDepartment(userDTO),
	};

	if (isValidationErrorsExist(errors)) {
		throw ApiError.BadRequest('Validation errors', errors);
	}

	const createdUser = await usersService.create(userDTO);

	res.status(201).json({
		status: Statuses.SUCCESS,
		data: {
			data: createdUser,
		},
	});
};

const update = async (
	req: Request<any, object, Partial<IUserDTO>>,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	const { id } = req.params;
	const userDTO = req.body;

	if (isNaN(Number(id))) {
		throw ApiError.BadRequest('Invalid id was passed');
	}

	const user = await usersService.getById(Number(id));

	if (!user) {
		throw ApiError.NotFound();
	}

	if (userDTO.password) {
		throw ApiError.UnprocessableEntity('Password changing is not allowed');
	}

	const errors = {
		login: userDTO.login ? usersValidator.validateLogin(userDTO) : null,
		firstName: userDTO.first_name ? usersValidator.validateFirstName(userDTO) : null,
		lastName: userDTO.last_name ? usersValidator.validateLastName(userDTO) : null,
		role: userDTO.role ? usersValidator.validateRole(userDTO) : null,
		department: userDTO.department ? usersValidator.validateDepartment(userDTO) : null,
	};

	if (isValidationErrorsExist(errors)) {
		throw ApiError.BadRequest('Validation errors', errors);
	}

	const updatedUser = await usersService.update(userDTO, Number(id));

	res.status(200).json({
		status: Statuses.SUCCESS,
		data: {
			data: updatedUser,
		},
	});
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;

	if (isNaN(Number(id))) {
		throw ApiError.BadRequest('Invalid id was passed');
	}

	const user = await usersService.getById(Number(id));

	if (!user) {
		throw ApiError.NotFound();
	}

	await usersService.remove(Number(id));

	res.sendStatus(204);
};

export const usersController = { getAll, getById, create, update, remove };
