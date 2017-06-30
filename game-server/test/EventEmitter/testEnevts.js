/**
 * Created by star on 2017/6/19.
 */

let events = require('events');

let eventEmitter = new events.EventEmitter();

// 创建事件
let connectHandler = function connected() {
    console.info('连接成功。');
    eventEmitter.emit('data_received');
};

eventEmitter.on('data_received', function () {
    console.info('数据接收成功。');
});


// 绑定事件
eventEmitter.on('connection', connectHandler);

eventEmitter.emit('connection');

console.info('程序执行完毕。');









