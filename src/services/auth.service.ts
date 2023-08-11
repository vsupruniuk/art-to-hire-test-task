import { IUserJWT } from '../types/users/IUserJWT';
import { jwtService } from './jwt.service';

const verifyAuthentication = (accessToken: string, refreshToken: string): IUserJWT | null => {
	let userData = jwtService.validateAccessToken(accessToken);

	if (!userData) {
		userData = jwtService.validateRefreshToken(refreshToken);
	}

	return userData;
};

export const authService = { verifyAuthentication };
