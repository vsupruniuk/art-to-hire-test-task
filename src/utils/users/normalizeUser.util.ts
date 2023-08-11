import { IFullUser } from '../../types/users/IFullUser';
import { IUser } from '../../types/users/IUser';

export const normalizeUser = ({
	id,
	login,
	first_name,
	last_name,
	role,
	department_id,
	position,
}: IFullUser): IUser => {
	return { id, login, first_name, last_name, role, department_id, position };
};
