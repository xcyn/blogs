const Redis = require('ioredis');
let redisConfig = process.env.NODE_ENV === 'development' ?
                  require('config').get('redis_dev') : 
                  require('config').get('redis');

const redis = new Redis(redisConfig);


module.exports = {
    async get(key:string) {
      let data = await redis.get(`REDIS:${key}`);
      try {
        data = JSON.parse(data);
      } catch (e) {
        data = null;
      }
      return Promise.resolve(data);
    },
  
    async set(key:string, value:string) {
      let res = null;
      try {
        res = await redis.set(`REDIS:${key}`, JSON.stringify(value));
      } catch (e) {
        res = null;
      }
      return Promise.resolve(res);
    },
  
    async del(key:string) {
      await redis.del(`REDIS:${key}`);
      return Promise.resolve(key);
    }
  };;
