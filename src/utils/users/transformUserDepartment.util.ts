import { TCreatingUser } from '../../types/users/TCreatingUser';
import { IUserDTO } from '../../types/dto/IUserDTO';

// Using to replace department with department_id (if departments is present) for PATCH request

export const transformUserDepartment = (
	userDTO: Partial<IUserDTO>,
	departmentId: number | null,
): Partial<TCreatingUser> => {
	const userCopy: Partial<TCreatingUser & { department: string }> = { ...userDTO };

	if (userDTO.department && departmentId) {
		userCopy.department_id = departmentId;
	}

	delete userCopy.department;

	return userCopy;
};
