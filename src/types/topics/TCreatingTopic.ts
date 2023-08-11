import { ITopic } from './ITopic';

// Topic data that will be sent to DB on POST request

export type TCreatingTopic = Omit<ITopic, 'id'>;
