import { IQueryParams } from '../types/queryParams/IQueryParams';
import { IValidationError } from '../types/errors/IValidationError';
import { Sorting } from '../types/enums/Sorting';
import moment from 'moment';

const validateOrderBy = (queryParams: IQueryParams): IValidationError | null => {
	if (queryParams.orderByDate && !Object.values(Sorting).includes(queryParams.orderByDate)) {
		return {
			field: 'query.orderByDate',
			message: 'Order by date can be one of: asc, desc',
		};
	}

	return null;
};

const validateDateFrom = (queryParams: IQueryParams): IValidationError | null => {
	if (queryParams.dateFrom && !moment(queryParams.dateFrom).isValid()) {
		return {
			field: 'query.dateFrom',
			message: 'Date from is an invalid date format',
		};
	}

	return null;
};

const validateDateTo = (queryParams: IQueryParams): IValidationError | null => {
	if (queryParams.dateTo && !moment(queryParams.dateTo).isValid()) {
		return {
			field: 'query.dateTo',
			message: 'Date to is an invalid date format',
		};
	}

	return null;
};

export const queryParamsValidator = { validateOrderBy, validateDateFrom, validateDateTo };
