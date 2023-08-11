import { ITopicDTO } from '../../types/dto/ITopicDTO';
import { TCreatingTopic } from '../../types/topics/TCreatingTopic';

export const transformTopic = (topicDTO: ITopicDTO, userId?: number): TCreatingTopic => {
	return {
		...topicDTO,
		user_id: userId || 1,
	};
};
