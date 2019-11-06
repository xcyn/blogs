const messageModel = require('../../../models/message').default
module.exports = async (ctx: any) => {
  const admin = await messageModel.find({})
  ctx.body = {
    errno: 200,
    errmsg: '成功',
    data: admin
  }
}
export {}
