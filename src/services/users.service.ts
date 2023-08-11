import { usersRepository } from '../repositories/users.repository';
import { IUser } from '../types/users/IUser';
import { normalizeUser } from '../utils/users/normalizeUser.util';
import { IUserDTO } from '../types/dto/IUserDTO';
import { ApiError } from '../exceptions/ApiError';
import * as bcrypt from 'bcrypt';
import { departmentsRepository } from '../repositories/departments.repository';
import { transformUser } from '../utils/users/transformUser.util';
import { transformUserDepartment } from '../utils/users/transformUserDepartment.util';
import { IQueryParams } from '../types/queryParams/IQueryParams';
import { IFullUser } from '../types/users/IFullUser';

const getAll = async (queryParams: IQueryParams): Promise<IUser[]> => {
	const users = await usersRepository.getAll(queryParams);

	return users.map(normalizeUser);
};

const getById = async (id: number): Promise<IUser | null> => {
	const user = await usersRepository.getById(id);

	return user ? normalizeUser(user) : null;
};

const getByLogin = async (login: string): Promise<IFullUser | null> => {
	return usersRepository.getByLogin(login);
};

const create = async (userDTO: IUserDTO): Promise<IUser> => {
	const existingUser = await getByLogin(userDTO.login);

	if (existingUser) {
		throw ApiError.UnprocessableEntity('User with this login already exist');
	}

	const hash = await bcrypt.hash(userDTO.password, 12);
	const department = await departmentsRepository.getByName(userDTO.department);

	const createdUser = await usersRepository.create(transformUser(userDTO, hash, department.id));

	return normalizeUser(createdUser);
};

const update = async (userDTO: Partial<IUserDTO>, id: number): Promise<IUser> => {
	const department = userDTO.department
		? await departmentsRepository.getByName(userDTO.department)
		: null;

	const updatedUser = await usersRepository.update(
		transformUserDepartment(userDTO, department?.id || null),
		id,
	);

	return normalizeUser(updatedUser);
};

const remove = async (id: number): Promise<void> => {
	await usersRepository.remove(id);
};

export const usersService = { getAll, getById, getByLogin, create, update, remove };
