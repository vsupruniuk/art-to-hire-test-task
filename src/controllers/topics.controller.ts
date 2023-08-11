import { NextFunction, Request, Response } from 'express';
import { IQueryParams } from '../types/queryParams/IQueryParams';
import { queryParamsValidator } from '../validators/queryParams.validator';
import { isValidationErrorsExist } from '../utils/errors/isValidationErrorsExist.util';
import { ApiError } from '../exceptions/ApiError';
import { topicsService } from '../services/topics.service';
import { Statuses } from '../types/enums/Statuses';
import { ITopicDTO } from '../types/dto/ITopicDTO';
import { topicsValidator } from '../validators/topics.validator';
import { authService } from '../services/auth.service';
import { io } from '../server';
import { TSocketsEvents } from '../types/wsebsockets/TSocketsEvents';

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

	const topics = await topicsService.getAll(queryParams);

	res.status(200).json({
		status: Statuses.SUCCESS,
		data: {
			data: topics,
		},
	});
};

const getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const { id } = req.params;

	if (isNaN(Number(id))) {
		throw ApiError.BadRequest('Invalid id was passed');
	}

	const topic = await topicsService.getById(Number(id));

	if (!topic) {
		throw ApiError.NotFound();
	}

	res.status(200).json({
		status: Statuses.SUCCESS,
		data: {
			data: topic,
		},
	});
};

const create = async (
	req: Request<object, object, ITopicDTO>,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	const { accessToken, refreshToken } = req.cookies;
	const topicDTO = req.body;

	const userData = authService.verifyAuthentication(accessToken, refreshToken);

	const errors = {
		title: topicsValidator.validateTitle(topicDTO),
		text: topicsValidator.validateText(topicDTO),
		description: topicsValidator.validateDescription(topicDTO),
	};

	if (isValidationErrorsExist(errors)) {
		throw ApiError.BadRequest('Validation errors', errors);
	}

	const createdTopic = await topicsService.create(topicDTO, userData?.id);

	// Send notifications for all active users

	io.emit<TSocketsEvents>('newTopic', {
		title: createdTopic.title,
		description: createdTopic.description,
	});

	res.status(201).json({
		status: Statuses.SUCCESS,
		data: {
			data: createdTopic,
		},
	});
};

const update = async (
	req: Request<any, object, Partial<ITopicDTO>>,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	const { id } = req.params;
	const topicDTO = req.body;

	if (isNaN(Number(id))) {
		throw ApiError.BadRequest('Invalid id was passed');
	}

	const topic = await topicsService.getById(Number(id));

	if (!topic) {
		throw ApiError.NotFound();
	}

	const errors = {
		title: topicDTO.title ? topicsValidator.validateTitle(topicDTO) : null,
		text: topicDTO.text ? topicsValidator.validateText(topicDTO) : null,
		description: topicDTO.description ? topicsValidator.validateDescription(topicDTO) : null,
	};

	if (isValidationErrorsExist(errors)) {
		throw ApiError.BadRequest('Validation errors', errors);
	}

	const updatedTopic = await topicsService.update(topicDTO, id);

	res.status(200).json({
		status: Statuses.SUCCESS,
		data: {
			data: updatedTopic,
		},
	});
};

const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const { id } = req.params;

	if (isNaN(Number(id))) {
		throw ApiError.BadRequest('Invalid id was passed');
	}

	const topic = await topicsService.getById(Number(id));

	if (!topic) {
		throw ApiError.NotFound();
	}

	await topicsService.remove(Number(id));

	res.sendStatus(204);
};

export const topicsController = { getAll, getById, create, update, remove };
