import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('topics', (table) => {
		table.increments('id').primary();
		table.string('title', 255).notNullable().checkLength('>=', 5);
		table.string('text', 500).notNullable().checkLength('>=', 10);
		table.string('description', 2000).notNullable().checkLength('>=', 20);
		table.integer('user_id').notNullable();
		// Foreign key should be like this, but planetscale (where I hosted DB) does not support them
		// table.integer('user_id').notNullable().unsigned().references('id').inTable('users');
		table.timestamps(true, true);
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('topics');
}
