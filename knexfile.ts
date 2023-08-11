import 'dotenv/config';
import { Knex } from 'knex';

const knexConfig: Record<string, Knex.Config> = {
	development: {
		client: 'mysql',
		connection: process.env.DB_CONNECTION_STRING,
		migrations: {
			directory: './src/db/migrations',
		},
		seeds: {
			directory: './src/db/seeds',
		},
		debug: false,
	},
	production: {
		client: 'mysql',
		connection: process.env.DB_CONNECTION_STRING,
		migrations: {
			directory: './src/db/migrations',
		},
		seeds: {
			directory: './src/db/seeds',
		},
	},
};

export default knexConfig;
