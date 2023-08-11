import { IUserJWT } from '../types/users/IUserJWT';
import jwt from 'jsonwebtoken';
import * as process from 'process';

const generateAccessToken = (user: IUserJWT): string => {
	return jwt.sign(user, process.env.JWT_ACCESS_SECRET || '', {
		expiresIn: process.env.JWT_ACCESS_TOKEN_EPIRES_IN,
	});
};

const generateRefreshToken = (user: IUserJWT): string => {
	return jwt.sign(user, process.env.JWT_REFRESH_SECRET || '', {
		expiresIn: process.env.JWT_REFRESH_TOKEN_EPIRES_IN,
	});
};

const validateAccessToken = (token: string): IUserJWT | null => {
	try {
		return jwt.verify(token, process.env.JWT_ACCESS_SECRET || '') as IUserJWT;
	} catch (err) {
		return null;
	}
};

const validateRefreshToken = (token: string): IUserJWT | null => {
	try {
		return jwt.verify(token, process.env.JWT_REFRESH_SECRET || '') as IUserJWT;
	} catch (err) {
		return null;
	}
};

export const jwtService = {
	generateAccessToken,
	generateRefreshToken,
	validateAccessToken,
	validateRefreshToken,
};
