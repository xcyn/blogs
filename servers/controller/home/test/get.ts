const userModel = require('../../../models/user').default
module.exports = async (ctx: any) => {
  const admin = await userModel.find({})
  ctx.body = {
    errno: 200,
    errmsg: '成功',
    data: admin
  }
}
export {}
