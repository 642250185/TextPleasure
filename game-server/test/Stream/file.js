/**
 * Created by star on 2017/6/29.
 */
let fs = require('fs');
let zlib = require('zlib');

// 读取流

// // 创建可读流
// let data = '';
// let readerStream = fs.createReadStream('../file/test.txt');
//
// // 设置编码为utf8
// readerStream.setEncoding('UTF8');
//
// // 处理流事件 --> data, end, and error
// readerStream.on('data', function (chunk) {
//     data += chunk;
// });
//
// readerStream.on('end', function () {
//     console.info('end : %j', data);
// });
//
// readerStream.on('error', (error) => {
//     console.error('error : %j', error.stack);
// });
//
// console.info('程序执行完毕');


// 写入流

// const data2 = '你好，我的愿望是世界和平';
//
// // 创建一个可以写入的流， 写入到文件 output.txt 中
// let writerStream = fs.createWriteStream('../file/output.txt');
//
// // 使用uft8 编码写入数据
// writerStream.write(data2, 'UTF8');
//
// // 标记文件末尾
// writerStream.end();
//
// // 处理流事件 --> data, end, and error
// writerStream.on('finish', () => {
//     console.info('写入完成。');
// });
//
// writerStream.on('error', (err) => {
//     console.error(err.stack);
// });
//
// console.info('程序执行完毕');

/**
 * 读写文件 > 从一个文件中读取内容写入到另一个文件中
 * @type {"fs".ReadStream}
 */

// // 创建一个可读流
// let readerStream = fs.createReadStream('../file/input.txt');
//
// // 创建一个可写流
// let writerStream = fs.createWriteStream('../file/output2.txt');
//
// // 管道读写操作
// // 读取 input.txt 文件内容，并将内容写到 output.txt 文件中
// readerStream.pipe(writerStream);
//
// console.info('程序执行完毕');

/**
 * 链式流
 * 链式是通过连接输出流到另外一个流并创建多个对个流操作链的机制。链式流一般用于管道操作。
 * 接下来我们就是用管道和链式来压缩和解压文件。
 *
 * 压缩文件
 */

// // 压缩 input.txt 文件为 input.txt.gz
// fs.createReadStream('../file/input.txt')
//     .pipe(zlib.createGzip())
//     .pipe(fs.createWriteStream('../file/input.txt.gz'));
//
// console.info('文件压缩完毕。');

/**
 * 解压文件
 */

//解压 input.txt.gz 文件为 input.txt
// fs.createReadStream('../file/input.txt.gz')
//     .pipe(zlib.createGunzip())
//     .pipe(fs.createWriteStream('../file/input3.txt'));
//
// console.info('文件解压完成。');
































