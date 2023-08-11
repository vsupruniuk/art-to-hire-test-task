import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('departments', (table) => {
		table.increments('id').primary();
		table.enum('name', ['administration', 'office', 'IT']).notNullable();
		table.timestamps(true, true);
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.table('users', (table) => {
		table.dropForeign(['department_id']);
	});

	await knex.schema.dropTableIfExists('departments');
}
