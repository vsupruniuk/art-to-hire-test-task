import { IQueryParams } from '../types/queryParams/IQueryParams';
import { db } from '../db/db';
import { DbTables } from '../types/enums/DbTables';
import moment from 'moment';
import { IFullTopic } from '../types/topics/IFullTopic';
import { TCreatingTopic } from '../types/topics/TCreatingTopic';
import { ITopicDTO } from '../types/dto/ITopicDTO';

const getAll = async ({ orderByDate, dateFrom, dateTo }: IQueryParams): Promise<IFullTopic[]> => {
	let query = db(DbTables.TOPICS)
		.select<IFullTopic[]>()
		.orderBy('created_at', orderByDate || 'desc');

	if (dateFrom || dateTo) {
		query = query.whereBetween('created_at', [
			dateFrom || moment(0).toDate(),
			dateTo || moment().toDate(),
		]);
	}

	return query;
};

const getById = async (id: number): Promise<IFullTopic | null> => {
	const topic = await db(DbTables.TOPICS).select<IFullTopic>().where({ id }).first();

	return topic || null;
};

const create = async (topic: TCreatingTopic): Promise<IFullTopic> => {
	const [id] = await db(DbTables.TOPICS).insert(topic);

	return db(DbTables.TOPICS).select().where({ id }).first();
};

const update = async (topic: Partial<ITopicDTO>, id: number): Promise<IFullTopic> => {
	await db(DbTables.TOPICS).where({ id }).update(topic);

	return db(DbTables.TOPICS).select().where({ id }).first();
};

const remove = async (id: number): Promise<void> => {
	await db(DbTables.TOPICS).where({ id }).delete();
};

export const topicsRepository = { getAll, getById, create, update, remove };
