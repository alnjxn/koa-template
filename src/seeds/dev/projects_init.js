
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Clear Tables
    knex('users_projects').del(),
    knex('users').del(),
    knex('projects').del(),

    // Projects
    knex('projects').insert({name: 'Caterpillar'}),
    knex('projects').insert({name: 'Spider'}),
    knex('projects').insert({name: 'Giraffe'}),

    // Users
    knex('users').insert({name: 'Rick James'}),
    knex('users').insert({name: 'Michael Jackson'}),
    knex('users').insert({name: 'Rod Stewart'}),

    // Project User Relationships
    knex('users_projects').insert({user_id: 1, project_id: 1}),
    knex('users_projects').insert({user_id: 1, project_id: 2}),
    knex('users_projects').insert({user_id: 1, project_id: 3}),
    knex('users_projects').insert({user_id: 2, project_id: 2}),
    knex('users_projects').insert({user_id: 2, project_id: 3}),
    knex('users_projects').insert({user_id: 3, project_id: 3})

  );
};
