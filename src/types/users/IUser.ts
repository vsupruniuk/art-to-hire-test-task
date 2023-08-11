import { UserRoles } from '../enums/UserRoles';

// User data for public response to client

export interface IUser {
	id: number;
	login: string;
	first_name: string;
	last_name: string;
	role: UserRoles;
	department_id: number;
	position: string | null;
}
