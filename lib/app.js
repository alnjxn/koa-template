import Koa from 'koa';
const app = new Koa();
const port = process.env.port || 5000;

app.use(ctx => {
  ctx.body = 'Hello Koa2';
});

app.listen(port, console.log(`Server started on port ${port}`));

export default app;
