/**
 * Created by root on 17-5-15.
 */

const ioredis = require('ioredis');
let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const dbConfig = require('../../config/data/env').mongodb;
const redisConfig = require('../../config/data/env').redis;
// 全局广播插件
const globalChannel = require('pomelo-globalchannel-plugin');
const channelService = require('./channelServiceController');


class initialization {

    constructor(app){
        this.app = app;
        this.initRedisService();
        this.initMongoDBService();
        this.initGlobalChannelService();
    }

    /**
     * 初始化Redis服务
     */
    initRedisService(){
        let redisClient = new ioredis(redisConfig.host, redisConfig.port, {password: redisConfig.auth_pass});
        redisClient.on("ready", res => {
            console.info('redisClient ready ', res);
        });
        redisClient.on("error", err => {
            console.error('redisClient error ', err);
        });
        redisClient.on("authError", err => {
            console.error('redisClient authError ', err);
        });
        redisClient.on("close", err => {
            console.info('redisClient close ', err);
        });
        this.app.set('redisClient', redisClient);
    }

    /**
     * 初始化数据库
     */
    initMongoDBService(){
        //重点在这一句，赋值一个全局的承诺。
        mongoose.Promise = global.Promise;
        let dbConnector = mongoose.connect(dbConfig.url);
        let db = dbConnector.connection;
        db.on('error', (err) => {
            console.error("connected failed:" + err.message);
        });
        db.on('open', callback => {
            console.info("connected to DB Scuess,args=%j", db.modelNames());
        });
        this.app.set("mongo", dbConnector, (err) => {
            if(err){
                throw err;
            }
        });
    }

    /**
     * 初始化广播机制
     */
    initGlobalChannelService(){
        this.app.use(globalChannel, {globalChannel: redisConfig});
        channelService.channelServiceStart();
    }

}



module.exports = initialization;