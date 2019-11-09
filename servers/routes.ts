var Router = require('koa-router')
var appRouter = new Router();

// 模块分层
//mogoose搭建测试
var home = require('./controller/home/router')
// 个人博客
var personal = require('./controller/personal/router')
// 微信
var weixin = require('./controller/weixin/router')
// 微信接口配置信息
appRouter.use('/weixin', weixin)
// appRouter.use('/home', home)
appRouter.use('/personal', personal)

module.exports = appRouter
