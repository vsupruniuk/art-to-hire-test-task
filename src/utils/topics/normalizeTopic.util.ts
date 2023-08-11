import { IFullTopic } from '../../types/topics/IFullTopic';
import { ITopic } from '../../types/topics/ITopic';

export const normalizeTopic = ({ id, title, text, description, user_id }: IFullTopic): ITopic => {
	return {
		id,
		title,
		text,
		description,
		user_id,
	};
};
