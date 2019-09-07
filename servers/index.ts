import * as Koa from 'koa';
import * as Router from 'koa-router';

const app = new Koa();
const router = new Router();

router.get('/*', async (ctx) => {
    ctx.body = '路由完毕...';
});

app.use(router.routes());

app.listen(3099);

console.log('Server running on port 3099');
