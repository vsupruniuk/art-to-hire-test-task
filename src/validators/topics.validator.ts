import { ITopicDTO } from '../types/dto/ITopicDTO';
import { IValidationError } from '../types/errors/IValidationError';

const validateTitle = (topicDTO: Partial<ITopicDTO>): IValidationError | null => {
	if (!(topicDTO.title && topicDTO.title.length >= 5)) {
		return {
			field: 'topic.title',
			message: 'Title must be at least 5 characters long',
		};
	}

	return null;
};

const validateText = (topicDTO: Partial<ITopicDTO>): IValidationError | null => {
	if (!(topicDTO.text && topicDTO.text.length >= 10)) {
		return {
			field: 'topic.text',
			message: 'Text must be at least 10 characters long',
		};
	}

	return null;
};

const validateDescription = (topicDTO: Partial<ITopicDTO>): IValidationError | null => {
	if (!(topicDTO.description && topicDTO.description.length >= 20)) {
		return {
			field: 'topic.description',
			message: 'Description must be at least 20 characters long',
		};
	}

	return null;
};

export const topicsValidator = { validateTitle, validateText, validateDescription };
