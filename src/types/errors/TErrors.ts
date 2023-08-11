import { IValidationError } from './IValidationError';

export type Errors = Record<string, string | IValidationError | null>;
