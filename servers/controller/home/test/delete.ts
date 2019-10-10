const userModel = require('../../../models/user').default
module.exports = async (ctx: any) => {
  const delData = {
    name: '王亚男'
  }
  try {
    await userModel.remove(delData)
    ctx.body = {
      errno: 200,
      errmsg: '删除成功',
      data: {}
    }
  } catch(err) {
    ctx.body = {
      errno: 400,
      errmsg: err,
      data: {}
    }
  }
}
export {}
