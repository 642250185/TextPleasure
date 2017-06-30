const fs = require('fs');
const xlsx = require('xlsx');
const pomelo = require('pomelo');
const scale = require('pomeloScale');
const Code = require('../shared/code');
const language = require('../shared/language');
const status = require('pomelo-status-plugin');
const questionModle = require('./app/db/modle/questionModle');
const initialization = require('./app/initial/initialization');

/**
 * Init app for client.
 */
let app = pomelo.createApp();
app.set('name', 'textPleasure');
app.set('baseInitialization', new initialization(app));

app.set('errorHandler', function (err, msg, resp, session, cb) {
    cb(null, {
        code: Code.FAIL,
        msg: language.common.requestError
    });
});


app.use(status, {status: {
    host: '127.0.0.1',
    port: 6379
}});


app.configure(function(){
    app.enable('sysemMonitor');
});


app.configure('development|production','connector|master', function () {
    let onlineUser = require('./app/monitor/onlineUser');
    app.registerAdmin(onlineUser, {app: app});
});

/**
 * 服务器的自动扩充配置
 */
app.configure('development|production', 'master', function(){
    app.use(scale, {
        scale: {
            cpu: {
                role : 5,   // role 服务器类型，5表示role服务器的阈值为5%，当超过5%系统自动扩充服务器
                interval: 10 * 1000,   // 系统检测时间，单位秒。
                increasement: 1 //  服务器一次扩充的数量
            },
            memory: {
                connector: 5,
                interval: 15 * 1000,
                increasement:  1
            },
            backup: 'config/backupServer.json'
        }
    });
});


app.configure('development|production', 'gate|connector', function(){
    app.set('connectorConfig', {
        connector : pomelo.connectors.hybridconnector,
        heartbeat : 3,
        useDict : true,   // 启用路由压缩
        useProtobuf : true    // 基于protobuf的传输数据压缩
    });
});

app.configure('development|production', 'role', function(){
    const workbook = xlsx.readFile("./config/data/questionData.xlsx");
    const sheetNames = workbook.SheetNames;
    console.info('需要导入的数据表: %j', sheetNames);
    const workSheet = workbook.Sheets[sheetNames];
    const work = xlsx.utils.sheet_to_json(workSheet);
    questionModle.joinQuestion(work);
});


app.start();

process.on('uncaughtException', function (err) {
    console.error(' Caught exception: ' + err.stack);
});
