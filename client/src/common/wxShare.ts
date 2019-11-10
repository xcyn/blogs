  import request from './request'
  let ua = navigator.userAgent.toLowerCase();
  let isWeixin = ua.indexOf('micromessenger') !== -1;
  const wxShare =  async function(params:any) {
    if (isWeixin) {
      let golobal:any = window
      const signData = (await request({
        url: '/weixinShare',
        method: 'get',
        params: {
          url: golobal.location.href
        }
      })).data
      //这块是做了网络请求去后台请求参数去了
      golobal.wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: signData.appid, // 必填，公众号的唯一标识
        timestamp: signData.timestamp, // 必填，生成签名的时间戳
        nonceStr: signData.nonceStr, // 必填，生成签名的随机串
        signature: signData.signature,// 必填，签名
        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表
      });
      golobal.wx.ready(function () {
        //分享到朋友
        golobal.wx.onMenuShareAppMessage({
          title: params.title, // 分享标题
          desc: params.desc, // 分享描述
          link: golobal.location.href, // 分享链接
          imgUrl: params.imgUrl || 'https://i.niupic.com/images/2019/11/05/_4.jpeg', // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          success: function () {
            alert("分享成功");
          },
          cancel: function () {
            alert("未分享!");
          }
        });
      });
    } 
  }
  export default wxShare
