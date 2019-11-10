var Router = require('koa-router')
var appRouter = new Router();
const axios = require('axios');
const weixinConfig = require('config').get('weixin')
const signUtils = require('../../utils/sign')
var cacheData:any = {}
// 接口配置信息
appRouter.get('/', async (ctx: any) => {
  let sha = require('sha1');
  const token = weixinConfig.token;
  //1.获取微信服务器Get请求的参数 signature、timestamp、nonce、echostr
  var signature = ctx.query.signature,//微信加密签名
  timestamp = ctx.query.timestamp,//时间戳
      nonce = ctx.query.nonce,//随机数
    echostr = ctx.query.echostr;//随机字符串

  //2.将token、timestamp、nonce三个参数进行字典序排序
  var array = [token,timestamp,nonce];
  array.sort();

  //3.将三个参数字符串拼接成一个字符串进行sha1加密
  var tempStr = array.join('');
  const resultCode = sha(tempStr)

  //4.开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
  if(resultCode === signature){
      ctx.body = echostr
  }else{
      ctx.body = 'mismatch'
  }
})

// 微信分享签名
appRouter.get('/weixinShare', async (ctx: any) => {
  try {
    // 获取 access token
    const tokenData = (await axios({
      method: 'GET',
      url: 'https://api.weixin.qq.com/cgi-bin/token',
      params: {
        'grant_type': 'client_credential',
        appid: weixinConfig.appid,
        secret: weixinConfig.secret
      }
    })).data
    cacheData.accessToken = tokenData.access_token
    // 获取 ticket
    const ticket = (await axios({
      method: 'post',
      url: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
      params: {
        access_token: tokenData.access_token,
        type: 'jsapi'
      }
    })).data
    cacheData.ticket = ticket
    // 签名
    const res = signUtils(ticket, ctx.request.query.url)
    ctx.body = {
      errno: 200,
      errmsg: '签名成功',
      data: res
    }
  } catch(err) {
    ctx.body = {
      errno: 400,
      errmsg: err,
      data: {}
    }
  }
})


module.exports = appRouter.routes()
