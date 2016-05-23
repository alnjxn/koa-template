import Koa from 'koa';
import router from './routes';

const app = new Koa();
const port = process.env.PORT || 3000;

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, console.log(`Server started on port ${port}`));

export default app;
