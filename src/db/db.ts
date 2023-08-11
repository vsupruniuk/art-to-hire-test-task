import knex from 'knex';
import knexFile from '../../knexfile';

const environment = process.env.NODE_ENV || 'development';

export const db = knex(knexFile[environment]);
