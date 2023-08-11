import { Sorting } from '../enums/Sorting';

// Possible query params

export interface IQueryParams {
	orderByDate?: Sorting;
	dateFrom?: string;
	dateTo?: string;
}
