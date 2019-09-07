import * as Koa from 'koa';
var appRoute = require('./routes')
// 定义全局路径
declare var global: any;
global.APP_PATH = __dirname

const app = new Koa();

// 路由中间件
app.use(appRoute.routes())
app.use(appRoute.allowedMethods());

app.listen(3099);

console.log('Server running on port 3099');
