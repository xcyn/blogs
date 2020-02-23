const redis = require('../../../redis');
const messageModel = require('../../../models/message').default
module.exports = async (ctx: any) => {
  const admin = await messageModel.find({})
  await redis.set('testRedis', 'hello word')
  const reslut = await redis.get('testRedis')
  console.log('reslut', reslut)
  ctx.body = {
    errno: 200,
    errmsg: '成功',
    data: admin
  }
}
export {}
