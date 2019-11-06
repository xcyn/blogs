import * as Koa from 'koa';
const chalk = require('chalk');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
let mongodbConfig = require('./mongodb/index');
// 接入监控
if (process.env.NODE_ENV === "development")
{
     const easyMonitor = require("easy-monitor");
     easyMonitor("love_bhs");
}
// 定义全局路径
declare var global: any;
global.APP_PATH = __dirname
// 中间件
var log = require('./middleware/log');
// 跨域中间件
var cross = require('./middleware/cross');
const koaBody = require('koa-body')
const appRoute = require('./routes')

const app = new Koa();
app.use(log)
app.use(cross)
app.use(koaBody({"multipart": true}))
// 链接数据库
app.use(async(ctx: any, next: any)=> {
     session({
          secret: 'sessiontest',
          resave: true,
          saveUninitalized: true,
          store: new MongoStore({
              url: mongodbConfig.getMongoUri()
          })
      })
      await next()
});
app.use(appRoute.routes())
app.use(appRoute.allowedMethods());

app.listen(3099,() => {
     chalk.green('Server running on port 3099');
});
