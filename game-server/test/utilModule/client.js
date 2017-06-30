/**
 * Created by star on 2017/6/30.
 */

const net = require('net');

let client = net.connect({port:8080}, function () {
    console.info('连接到服务器');
});

client.on('data', function (data) {
    console.log(data.toString());
    client.end();
});

client.on('end', function () {
    console.info('断开与服务器的连接');
});







































