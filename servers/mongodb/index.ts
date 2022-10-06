let mongoose = require('mongoose');
let isdev = process.env.NODE_ENV === 'development'
let mongodbConfig = isdev ? require('config').get('mongodb_dev') : require('config').get('mongodb');

/**
 * debug 模式
 */
mongoose.set('debug', true);

/**
 * 使用 Node 自带 Promise 代替 mongoose 的 Promise
 */
mongoose.Promise = global.Promise;
/**
 * 配置 MongoDb options
 */
interface config {
    useMongoClient: Boolean;
    poolSize: number;
    reconnectTries: number;
    keepAlive: number;
    user: string,
    pass: string,
    replicaSet: string,
}
function getMongoOptions() {
    let options: config = {
        useMongoClient: true,
        poolSize: 5, // 连接池中维护的连接数
        reconnectTries: Number.MAX_VALUE,
        keepAlive: 120,
        user: '',
        pass: '',
        replicaSet: '',
    };
    // mongoose从@5.2.8后会弃用一些指令，为防止程序如下警告
    mongoose.set('useNewUrlParser', true)
    mongoose.set('useFindAndModify', false)
    mongoose.set('useCreateIndex', true)
    if (mongodbConfig.get('user')) options.user = mongodbConfig.get('user');
    if (mongodbConfig.get('pass')) options.pass = mongodbConfig.get('pass');
    if (mongodbConfig.get('replicaSet').get('name')) options.replicaSet = mongodbConfig.get('replicaSet').get('name');
}


/**
 * 拼接 MongoDb Uri
 *
 * @returns {string}
 */
function getMongoUri() {
    let mongoUri = 'mongodb://';
    let dbName = mongodbConfig.get('db');
    let replicaSet = mongodbConfig.get('replicaSet');
    if (replicaSet.get('name')) { // 如果配置了 replicaSet 的名字 则使用 replicaSet
        let members = replicaSet.get('members');
        for (let member of members) {
            mongoUri += `${member.host}:${member.port},`;
        }
        mongoUri = mongoUri.slice(0, -1); // 去掉末尾逗号
    } else {
        mongoUri += `${mongodbConfig.get('host')}:${mongodbConfig.get('port')}`;
    }
    mongoUri += `/${dbName}`;
    
    return mongoUri;
}


/**
 * 创建 Mongo 连接，内部维护了一个连接池，全局共享
 */
mongoose.connect(getMongoUri(), getMongoOptions());
let mongoClient = mongoose.connection

/**
 * Mongo 连接成功回调
 */
mongoClient.on('connected', function () {
    console.log('-----------Mongo连接成功-----------')
    console.log('Mongoose connected to ' + getMongoUri());
});
/**
 * Mongo 连接失败回调
 */
mongoClient.on('error', function (err: string) {
    console.log('-----------Mongo连接失败-----------')
    console.log('Mongoose connection error: ' + err);
});
/**
 * Mongo 关闭连接回调
 */
mongoClient.on('disconnected', function () {
    console.log('-----------Mongo关闭成功-----------')
});


module.exports = {
    mongoClient,
    getMongoUri
};
