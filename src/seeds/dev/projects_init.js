
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Clear Tables
    knex('users_projects').del(),
    knex('users').del(),
    knex('projects').del(),

    // Projects
    knex('projects').insert({id: 1, name: 'Caterpillar'}),
    knex('projects').insert({id: 2, name: 'Spider'}),
    knex('projects').insert({id: 3, name: 'Giraffe'}),

    // Users
    knex('users').insert({id: 1, name: 'Rick James'}),
    knex('users').insert({id: 2, name: 'Michael Jackson'}),
    knex('users').insert({id: 3, name: 'Rod Stewart'}),

    // Project User Relationships
    knex('users_projects').insert({user_id: 1, project_id: 1}),
    knex('users_projects').insert({user_id: 1, project_id: 2}),
    knex('users_projects').insert({user_id: 1, project_id: 3}),
    knex('users_projects').insert({user_id: 2, project_id: 2}),
    knex('users_projects').insert({user_id: 2, project_id: 3}),
    knex('users_projects').insert({user_id: 3, project_id: 3})

  );
};
