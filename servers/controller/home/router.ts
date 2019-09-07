var Router = require('koa-router')
var appRouter = new Router();

var test = require('./test')

appRouter.get('/test', test)

module.exports = appRouter.routes()
