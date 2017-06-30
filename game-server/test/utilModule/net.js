/**
 * Created by star on 2017/6/30.
 */

const net = require('net');

let server = net.createServer(function (connection) {
    console.info('client connected');

    connection.on('end', function () {
        console.info('客户端关闭连接');
    });

    connection.write('hello world!\r\n');
    connection.pipe(connection);
});

server.listen(8080, function () {
    console.info('server is listening');
});







































