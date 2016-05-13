import Koa from 'koa';
const app = new Koa();
const port = process.env.PORT|| 3000;

app.use(ctx => {
  ctx.body = 'Hello World';
});

app.listen(port, console.log(`Server started on port ${port}`));

export default app;
