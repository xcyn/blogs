module.exports = async (ctx: any, next: any) => {
  try {
      ctx.set('Access-Control-Allow-Origin', `*`);
      ctx.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
      ctx.set('Access-Control-Allow-Headers', 'X-Requested-With, User-Agent, Referer, Content-Type, Cache-Control,accesstoken');
      ctx.set('Access-Control-Max-Age', '86400');
      ctx.set('Access-Control-Allow-Credentials', 'true')
      await next();
  } catch (err) {
      ctx.state.log.error(err)
  }
};
