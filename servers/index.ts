import * as Koa from 'koa';
// 定义全局路径
declare var global: any;
global.APP_PATH = __dirname
// 中间件
var log = require('./middleware/log');
const koaBody = require('koa-body')
const appRoute = require('./routes')

const app = new Koa();
app.use(log)
app.use(koaBody({"multipart": true}))
app.use(appRoute.routes())
app.use(appRoute.allowedMethods());

app.listen(3099);

console.log('Server running on port 3099');
