import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
	await knex('users').del();

	await knex('users').insert([
		{
			login: 't.stark',
			first_name: 'Tony',
			last_name: 'Stark',
			role: 'administrator',
			password: '12345678',
			department_id: 1,
			position: 'System Administrator',
		},
	]);
}
