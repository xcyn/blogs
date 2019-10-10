const userModel = require('../../../models/user').default
module.exports = async (ctx: any) => {
  const updateData = {
    phone: 'kongzhi0707',
    name: '王亚男'
  }
  try {
    await userModel.findOneAndUpdate(updateData, {name: '哈哈哈'})
    ctx.body = {
      errno: 200,
      errmsg: '更新成功',
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
