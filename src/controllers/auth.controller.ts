import { NextFunction, Request, Response } from 'express';
import { ILoginDTO } from '../types/dto/ILoginDTO';
import { usersService } from '../services/users.service';
import { ApiError } from '../exceptions/ApiError';
import bcrypt from 'bcrypt';
import { jwtService } from '../services/jwt.service';
import * as process from 'process';
import { IFullUser } from '../types/users/IFullUser';
import { authService } from '../services/auth.service';

const login = async (
	req: Request<object, object, ILoginDTO>,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	const loginDTO = req.body;

	const user = await usersService.getByLogin(loginDTO.login);

	if (!user) {
		throw ApiError.UnprocessableEntity('User with this login does not exist');
	}

	const isPasswordValid = await bcrypt.compare(loginDTO.password, user.password);

	if (!isPasswordValid) {
		throw ApiError.BadRequest('Invalid password');
	}

	await setTokensToCookies(req, res, user);
};

const refresh = async (
	req: Request<object, object, ILoginDTO>,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	const { accessToken, refreshToken } = req.cookies;

	const userData = authService.verifyAuthentication(accessToken, refreshToken);

	if (!userData) {
		throw ApiError.Unauthorized();
	}

	const user = await usersService.getByLogin(userData.login);

	if (!user) {
		throw ApiError.NotFound();
	}

	await setTokensToCookies(req, res, user);
};

const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	res.clearCookie('accessToken');
	res.clearCookie('refreshToken');
	res.sendStatus(204);
};

const setTokensToCookies = async (
	req: Request<object, object, ILoginDTO>,
	res: Response,
	user: IFullUser,
): Promise<void> => {
	const accessToken = jwtService.generateAccessToken({
		login: user.login,
		id: user.id,
		role: user.role,
	});
	const refreshToken = jwtService.generateRefreshToken({
		login: user.login,
		id: user.id,
		role: user.role,
	});

	// As an alternative, we can send one of the accessToken to the client,
	// and when checking the authorization, receive token in the authorization header,
	// but I stopped at this option

	res.cookie('accessToken', accessToken, {
		maxAge: Number(process.env.COOKIE_ACCESS_TOKEN_EPIRES_IN),
		httpOnly: true,
		sameSite: 'strict',
	});

	res.cookie('refreshToken', refreshToken, {
		maxAge: Number(process.env.COOKIE_REFRESH_TOKEN_EPIRES_IN),
		httpOnly: true,
		sameSite: 'strict',
	});

	res.sendStatus(204);
};

export const authController = { login, refresh, logout };
