import { IQueryParams } from '../types/queryParams/IQueryParams';
import { topicsRepository } from '../repositories/topics.repository';
import { ITopic } from '../types/topics/ITopic';
import { normalizeTopic } from '../utils/topics/normalizeTopic.util';
import { ITopicDTO } from '../types/dto/ITopicDTO';
import { transformTopic } from '../utils/topics/transformTopic.util';

const getAll = async (queryParams: IQueryParams): Promise<ITopic[]> => {
	const topics = await topicsRepository.getAll(queryParams);

	return topics.map(normalizeTopic);
};

const getById = async (id: number): Promise<ITopic | null> => {
	const topic = await topicsRepository.getById(id);

	return topic ? normalizeTopic(topic) : null;
};

const create = async (topicDTO: ITopicDTO, userId?: number): Promise<ITopic> => {
	const createdTopic = await topicsRepository.create(transformTopic(topicDTO, userId));

	return normalizeTopic(createdTopic);
};

const update = async (topicDTO: Partial<ITopicDTO>, id: number): Promise<ITopic> => {
	const updatedTopic = await topicsRepository.update(topicDTO, id);

	return normalizeTopic(updatedTopic);
};

const remove = async (id: number): Promise<void> => {
	await topicsRepository.remove(id);
};

export const topicsService = { getAll, getById, create, update, remove };
