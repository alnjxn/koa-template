import Router from 'koa-router';
import db from './db';

// Data Models
let User = db.Model.extend({
  tableName: 'users',
  projects: () => {
    return this.belongsToMany(Project);
  }
});

let Project = db.Model.extend({
  tableName: 'projects',
  users: () => {
    return this.belongsToMany(User);
  }
});

// Routes
let router = Router({
  prefix: '/api'
});

router.get('/', (ctx, next) => {
  ctx.body = { api: 'v1.0' };
  return next();
});

router.get('/users', (ctx, next) => {
  return User.fetchAll().then((collection) => {
    ctx.body = collection.toJSON();
    return next();
  });
});

router.get('/users/:id', (ctx, next) => {
  return new User({id: ctx.params.id})
    .fetch()
    .then((user) => {
      if (!user) {
        ctx.status = 404;
        ctx.body = {error: 'User not found'};
        return next();
      } else {
        ctx.body = user.toJSON();
        return next();
      }
    });
});

router.post('/users', (ctx, next) => {
  if (!ctx.request.body.name) {
    ctx.status = 400;
    ctx.body = { error: 'invalid request' };
    return next();
  }
  return new User({
    name: ctx.request.body.name
  })
  .save()
  .then((user) => {
    if (!user) {
      ctx.status = 400;
      ctx.body = { error: 'Invalid request' };
    } else {
      ctx.body = user.toJSON();
    }
    return next();
  })
  .catch((err) => {
    ctx.status = 500;
    ctx.body = { error: err };
    return next();
  });
});

export default router;
