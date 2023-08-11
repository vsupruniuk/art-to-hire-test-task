import { db } from '../db/db';
import { DbTables } from '../types/enums/DbTables';
import { IFullUser } from '../types/users/IFullUser';
import { TCreatingUser } from '../types/users/TCreatingUser';
import { IQueryParams } from '../types/queryParams/IQueryParams';
import moment from 'moment';

const getAll = async ({ orderByDate, dateFrom, dateTo }: IQueryParams): Promise<IFullUser[]> => {
	let query = db(DbTables.USERS)
		.select<IFullUser[]>()
		.orderBy('created_at', orderByDate || 'asc');

	if (dateFrom || dateTo) {
		query = query.whereBetween('created_at', [
			dateFrom || moment(0).toDate(),
			dateTo || moment().toDate(),
		]);
	}

	return query;
};

const getById = async (id: number): Promise<IFullUser | null> => {
	const user = await db(DbTables.USERS).select<IFullUser>().where({ id }).first();

	return user || null;
};

const getByLogin = async (login: string): Promise<IFullUser | null> => {
	const user = await db(DbTables.USERS).select<IFullUser>().where({ login }).first();

	return user || null;
};

const create = async (user: TCreatingUser): Promise<IFullUser> => {
	const [id] = await db(DbTables.USERS).insert(user);

	return db(DbTables.USERS).select().where({ id }).first();
};

const update = async (user: Partial<TCreatingUser>, id: number): Promise<IFullUser> => {
	await db(DbTables.USERS).where({ id }).update(user);

	return db(DbTables.USERS).select().where({ id }).first();
};

const remove = async (id: number): Promise<void> => {
	await db(DbTables.USERS).where({ id }).delete();
};

export const usersRepository = { getAll, getById, getByLogin, create, update, remove };
