import { UserRoles } from '../enums/UserRoles';
import { Departments } from '../enums/Departments';

export interface IUserDTO {
	login: string;
	first_name: string;
	last_name: string;
	role: UserRoles;
	password: string;
	department: Departments;
	position?: string;
}
