// var bodyParser = require('koa-bodyparser');
import bodyParser from 'koa-bodyparser';
import Koa from 'koa';
import router from './routes';

const port = process.env.PORT || 3000;
const app = new Koa();
app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, console.log(`Server started on port ${port}`));

export default app;
