var Router = require('koa-router')
var appRouter = new Router();
const sha1 = require('sha1');
const token = 'weixin';

appRouter.get('/', async (ctx: any) => {
  console.log('----------')
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
  const resultCode = sha1(tempStr)

  //4.开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
  if(resultCode === signature){
      ctx.body = echostr
  }else{
      ctx.body = 'mismatch'
  }
})

module.exports = appRouter.routes()
