import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
	await knex('departments').del();

	await knex('departments').insert([
		{ name: 'administration' },
		{ name: 'office' },
		{ name: 'IT' },
	]);
}
