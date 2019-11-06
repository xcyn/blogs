const messageModel = require('../../../models/message').default
module.exports = async (ctx: any) => {
  const updateData = {
    phone: '18811742305',
    name: '王亚男',
    message: '你好，川宇, 很高兴认识你！'
  }
  try {
    await messageModel.findOneAndUpdate(updateData, {message: '哈哈哈'})
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
