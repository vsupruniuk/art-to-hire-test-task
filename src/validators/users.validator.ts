import { IUserDTO } from '../types/dto/IUserDTO';
import { UserRoles } from '../types/enums/UserRoles';
import { IValidationError } from '../types/errors/IValidationError';
import { Departments } from '../types/enums/Departments';

const validateLogin = (userDTO: Partial<IUserDTO>): IValidationError | null => {
	if (!(userDTO.login && userDTO.login.length >= 5)) {
		return {
			field: 'user.login',
			message: 'Login must be at least 5 characters long',
		};
	}

	return null;
};

const validateFirstName = (userDTO: Partial<IUserDTO>): IValidationError | null => {
	if (!(userDTO.first_name && userDTO.first_name.length >= 3)) {
		return {
			field: 'user.first_name',
			message: 'First name must be at least 3 characters long',
		};
	}

	return null;
};

const validateLastName = (userDTO: Partial<IUserDTO>): IValidationError | null => {
	if (!(userDTO.last_name && userDTO.last_name.length >= 3)) {
		return {
			field: 'user.last_name',
			message: 'Last name must be at least 3 characters long',
		};
	}

	return null;
};

const validateRole = (userDTO: Partial<IUserDTO>): IValidationError | null => {
	if (!(userDTO.role && Object.values(UserRoles).includes(userDTO.role))) {
		return {
			field: 'user.role',
			message: 'Role can be one of: administrator, user',
		};
	}

	return null;
};

const validatePassword = (userDTO: Partial<IUserDTO>): IValidationError | null => {
	if (!(userDTO.password && userDTO.password.length >= 8)) {
		return {
			field: 'user.password',
			message: 'Password name must be at least 8 characters long',
		};
	}

	return null;
};

const validateDepartment = (userDTO: Partial<IUserDTO>): IValidationError | null => {
	if (!(userDTO.department && Object.values(Departments).includes(userDTO.department))) {
		return {
			field: 'user.department',
			message: 'Department can be one of: administration, office, IT',
		};
	}

	return null;
};

export const usersValidator = {
	validateLogin,
	validateFirstName,
	validateLastName,
	validateRole,
	validatePassword,
	validateDepartment,
};
