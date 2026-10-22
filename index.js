import Koa from 'koa';
import BodyParser from 'koa-bodyparser';
import itemRouter from './item/item-router.js';

const app = new Koa(); // инициализация http сервер

app.use(bodyParser()); // подключение роутера к http серверу
app.use(itemRouter.routes());
app.use(itemRouter.allowedMethods());

app.listen(3000);
