var Router = require('koa-router')
var appRouter = new Router();

// 模块分层
var home = require('./controller/home/router')
appRouter.use('/home', home)

module.exports = appRouter
