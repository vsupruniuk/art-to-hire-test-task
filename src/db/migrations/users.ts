import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('users', (table) => {
		table.increments('id').primary();
		table.string('login', 255).unique().notNullable().checkLength('>=', 5);
		table.string('first_name', 255).notNullable().checkLength('>=', 3);
		table.string('last_name', 255).notNullable().checkLength('>=', 3);
		table.enum('role', ['administrator', 'user']).notNullable().defaultTo('user');
		table.string('password', 255).notNullable().checkLength('>=', 8);
		table.integer('department_id').notNullable();
		// Foreign key should be like this, but planetscale (where I hosted DB) does not support them
		// table.integer('department_id').notNullable().unsigned().references('id').inTable('departments');
		table.string('position', 255).nullable();
		table.timestamps(true, true);
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.table('topics', (table) => {
		table.dropForeign(['user_id']);
	});

	await knex.schema.dropTableIfExists('users');
}
