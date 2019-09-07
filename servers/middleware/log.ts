const dayjs = require("dayjs");
const log4js = require("log4js");
const isDev = process.env.NODE_ENV === "dev";
const logFilePath = isDev ? "logs/" : "logs/"; // 部署之后配置待定
const config = {
  appenders: {
    infoLog: {
          type: "dateFile",
          filename: `${logFilePath}lovebhs-info.log`,
          pattern: "-yyyy-MM-dd",
          alwaysIncludePattern: true
      },
      errorLog: {
          type: "dateFile",
          filename: `${logFilePath}lovebhs-error.log`,
          pattern: "-yyyy-MM-dd",
          alwaysIncludePattern: true
      }
  },
  categories: {
      errorLog: { appenders: ["errorLog"], level: "error" },
      infoLog: { appenders: ["infoLog"], level: "info" },
      default: { appenders: ["infoLog", "errorLog"], level: "trace" }
  },
  disableClustering: true
};
log4js.configure(config);
// 此处使用category的值
const errorLog = log4js.getLogger("errorLog");
const infoLog = log4js.getLogger("infoLog");
const errorSend = (ctx: any) => {
  return (msg: String) => {
    let errorMsg = `时间: ${dayjs().format('HH:ss')} --- 错误信息为:${msg}`
    console.log('错误信息: ', errorMsg)
    errorLog.error(errorMsg)    
  }
}
const infoSend = (ctx: any )=> {
  return (msg: String) => {
    let infoMsg = `时间: ${dayjs().format('HH:ss')} --- 日志信息为:${msg}`
    console.log('日志信息：',infoMsg)
    infoLog.info(infoMsg)    
  }
}

module.exports = async (ctx: any, next: any) => {
  try {
      ctx.state.log = {
        error: errorSend(ctx),
        info: infoSend(ctx),
      }
      // 记录每次请求的接口日志
      ctx.state.log.info(ctx.url)
      await next();
  } catch (err) {
      ctx.state.log.error(err)
  }
};
