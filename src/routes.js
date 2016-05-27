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

// USERS
router.get('/users', (ctx, next) => {
  return User.fetchAll().then((collection) => {
    ctx.body = collection.toJSON();
    return next();
  });
});

router.get('/users/:id', (ctx, next) => {
  return User.forge({id: ctx.params.id})
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
  let name = ctx.request.body.name;
  ctx.assert(name, 400, 'name required');
  return User.forge({ name: name }).save()
  .then((user) => {
    ctx.body = user;
    return next();
  })
  .catch((err) => {
    ctx.status = 500;
    ctx.body = { error: err };
    return next();
  });
});

// PROJECTS
router.get('/projects', (ctx, next) => {
  return Project.fetchAll().then((projects) => {
    ctx.body = projects.toJSON();
    return next();
  });
});

router.get('/projects/:id', (ctx, next) => {
  return Project.forge({id: ctx.params.id})
    .fetch()
    .then((project) => {
      if (!project) {
        ctx.status = 404;
        ctx.body = {error: 'Project not found'};
        return next();
      } else {
        ctx.body = project.toJSON();
        return next();
      }
    });
});

router.post('/projects', (ctx, next) => {
  let name = ctx.request.body.name;
  ctx.assert(name, 400, 'name required');
  return Project.forge({ name: name }).save()
  .then((project) => {
    ctx.body = project;
    return next();
  })
  .catch((err) => {
    ctx.status = 500;
    ctx.body = { error: err };
    return next();
  });
});

export default router;
