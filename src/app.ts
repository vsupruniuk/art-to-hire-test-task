import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { usersRoute } from './routes/users.route';
import { errorMiddleware } from './middlwares/error.middleware';
import { topicsRouter } from './routes/topics.route';
import { authRouter } from './routes/auth.router';
import { ApiError } from './exceptions/ApiError';

export const app = express();

app.use(
	cors({
		origin: '*',
		credentials: true,
	}),
);
app.use(helmet());
app.use(json());
app.use(cookieParser());

app.use(authRouter);
app.use('/api/users', usersRoute);
app.use('/api/topics', topicsRouter);

// For handling all invalid routes

app.all('*', () => {
	throw ApiError.NotFound('Cannot find this route');
});

app.use(errorMiddleware);
