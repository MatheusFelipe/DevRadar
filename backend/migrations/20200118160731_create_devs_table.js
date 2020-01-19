/* eslint camelcase: 0 */
exports.down = async knex => {
  await knex.schema.dropTableIfExists('devs');
};

exports.up = async knex => {
  await this.down(knex);
  await knex.schema.createTable('devs', table => {
    table.increments('id').primary();
    table.text('name');
    table.text('githubUsername').notNullable();
    table.text('bio');
    table.text('avatarUrl');
    table
      .timestamp('createdAt', { useTz: false })
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp('updatedAt', { useTz: false })
      .notNullable()
      .defaultTo(knex.fn.now());
  });
  await knex.raw('alter table devs add column coordinates point not null');
  await knex.raw('alter table devs add column techs text[] not null');
  // the following extensions are necessary for point distance calculation
  await knex.raw('create extension if not exists cube');
  await knex.raw('create extension if not exists earthdistance');
};
