import { IUserDTO } from '../../types/dto/IUserDTO';
import { TCreatingUser } from '../../types/users/TCreatingUser';

export const transformUser = (
	{ login, first_name, last_name, role, position }: IUserDTO,
	hashedPassword: string,
	departmentId: number,
): TCreatingUser => {
	return {
		login,
		first_name,
		last_name,
		role,
		password: hashedPassword,
		department_id: departmentId,
		position: position || null,
	};
};
