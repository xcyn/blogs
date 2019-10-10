const userModel = require('../../../models/user').default
module.exports = async (ctx: any) => {
  const inserData = {
    phone: 'kongzhi0707',
    name: '王亚男'
  }
  const hasOne = await userModel.findOne(inserData)
  if(hasOne) {
    ctx.body = {
      errno: 400,
      errmsg: '已经存在此数据',
      data: {}
    }
  } else {
    var user = new userModel(inserData);
    try {
      await user.save()
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
