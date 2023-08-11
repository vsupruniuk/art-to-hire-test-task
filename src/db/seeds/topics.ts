import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
	await knex('topics').del();

	await knex('topics').insert([
		{
			title: 'Exploring the Mysteries of Deep Sea Creatures',
			text: 'Diving into the depths of the ocean reveals a world teeming with life that defies imagination. From bioluminescent organisms illuminating the abyss to colossal squid battling in the darkness, the mysteries of deep-sea creatures continue to captivate scientists and adventurers alike.',
			description:
				'Embark on an underwater journey to uncover the enigmatic world of deep-sea creatures. Discover the fascinating adaptations that allow these organisms to thrive in extreme pressure and near-freezing temperatures. Join us as we delve into the depths, shedding light on the unknown and revealing the extraordinary beauty and complexity hidden beneath the surface.',
			user_id: 1,
		},
	]);
}
