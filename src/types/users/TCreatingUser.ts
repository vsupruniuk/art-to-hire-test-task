import { IFullUser } from './IFullUser';

// User data that will be sent to DB on POST request

export type TCreatingUser = Omit<IFullUser, 'id' | 'created_at' | 'updated_at'>;
