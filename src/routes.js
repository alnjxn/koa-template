import Router from 'koa-router';
import db from './db';

var Users = db.Model.extend({
  tableName: 'users'
});

let router = Router();

router.get('/', (ctx, next) => {
  ctx.body = { api: 'v1.0' };
  return next();
});

router.get('/users', (ctx, next) => {
  return Users.fetchAll().then((collection) => {
    ctx.body = collection.toJSON();
    return next();
  });
});

export default router;
