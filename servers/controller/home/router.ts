var Router = require('koa-router')
var appRouter = new Router();

var testGet = require('./test/get')
var testSave = require('./test/save')
var testUpdate = require('./test/update')
var delRemove = require('./test/delete')

appRouter.get('/test/get', testGet)
appRouter.get('/test/save', testSave)
appRouter.get('/test/update', testUpdate)
appRouter.get('/test/delete', delRemove)

module.exports = appRouter.routes()
