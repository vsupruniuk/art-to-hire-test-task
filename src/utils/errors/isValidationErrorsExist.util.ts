import { IValidationError } from '../../types/errors/IValidationError';

interface Props {
	[key: string]: IValidationError | null;
}

export const isValidationErrorsExist = (errors: Props): boolean => {
	return Object.values(errors).some((error) => Boolean(error));
};
