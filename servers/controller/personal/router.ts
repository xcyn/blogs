var Router = require('koa-router')
var appRouter = new Router();

var messageGet = require('./message/get')
var messageSave = require('./message/save')
var messageUpdate = require('./message/update')
var messageRemove = require('./message/delete')

appRouter.get('/message/get', messageGet)
appRouter.post('/message/save', messageSave)
appRouter.get('/message/update', messageUpdate)
appRouter.get('/message/delete', messageRemove)

module.exports = appRouter.routes()
