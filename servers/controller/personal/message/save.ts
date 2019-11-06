const messageModel = require('../../../models/message').default
module.exports = async (ctx: any) => {
  let inserData = ctx.request.body
  if(!inserData) {
    ctx.body = {
      errno: 400,
      errmsg: '请求数据错误',
      data: {}
    }
  }
  const hasOne = await messageModel.findOne(inserData)
  if(hasOne) {
    ctx.body = {
      errno: 400,
      errmsg: '已经存在此数据',
      data: {}
    }
  } else {
    var message = new messageModel(inserData);
    try {
      await message.save()
      ctx.body = {
        errno: 200,
        errmsg: '插入成功',
        data: {}
      }
    } catch(err) {
      ctx.body = {
        errno: 400,
        errmsg: '插入失败',
        data: {}
      }
    }
  }

}
