// Projects and Users
exports.up = (knex, Promise) => {
  return knex.schema.createTable('projects', (table) => {
    table.increments('id').primary();
    table.string('name');
  }).createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name');
  }).createTable('users_projects', (table) => {
    table.integer('user_id').references('users.id');
    table.integer('project_id').references('projects.id');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users_projects')
    .dropTable('users')
    .dropTable('projects');
};
