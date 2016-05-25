import dbConfig from './knexfile';

var database;
if (process.env.NODE_ENV == 'production') {
  database = dbConfig.production;
} else {
  database = dbConfig.development;
}

const knex = require('knex')(database);
const bookshelf = require('bookshelf')(knex);

export default bookshelf;
