import { Errors } from '../../types/errors/TErrors';

export const removeNullableErrors = (errors: Errors): Errors => {
	return Object.fromEntries(Object.entries(errors).filter(([, value]) => Boolean(value)));
};
