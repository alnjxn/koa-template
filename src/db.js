import dbConfig from './knexfile';

const knex = require('knex')(dbConfig.development);
const bookshelf = require('bookshelf')(knex);

export default bookshelf;
