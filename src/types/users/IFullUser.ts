import { UserRoles } from '../enums/UserRoles';

// Full user data stored in DB

export interface IFullUser {
	id: number;
	login: string;
	first_name: string;
	last_name: string;
	role: UserRoles;
	password: string;
	department_id: number;
	position: string | null;
	created_at: string;
	updated_at: string;
}
