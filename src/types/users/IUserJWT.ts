import { UserRoles } from '../enums/UserRoles';

// User data stored in JWT tokens. Id and login for identification, role for restrictToAdmin middleware

export interface IUserJWT {
	id: number;
	login: string;
	role: UserRoles;
}
