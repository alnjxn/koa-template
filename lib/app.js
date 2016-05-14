import Koa from 'koa';
import Router from 'koa-router';
const app = new Koa();
const router = new Router();
const port = process.env.PORT|| 3000;

router.get('/', (ctx, next) => {
  ctx.body = 'Hello World';
  next();
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, console.log(`Server started on port ${port}`));

export default app;
