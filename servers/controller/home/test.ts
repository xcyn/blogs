const userModel = require('../../models/user').default
module.exports = async (ctx: any) => {
  const admin = await userModel.find({})
  // console.log('-----', admin)
  ctx.body = {
    errno: 200,
    errmsg: '成功',
    data: admin
  }
}
