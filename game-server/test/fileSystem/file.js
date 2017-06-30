/**
 * Created by star on 2017/6/30.
 */

const fs = require('fs');

/**
 * 文件打开行为。
 */
const R = 'r';              // 以读取模式打开文件。如果文件不存在抛出异常
const R_PLUS = 'r+';        // 以读写模式打开文件。如果文件不存在抛出异常
const RS = 'rs';            // 以同步的方式读取文件
const RS_PLUS = 'rs+';      // 以同步的方式读取和写入文件
const W = 'w';              // 以写入模式打开文件，如果文件不存在则创建
const WX = 'wx';            // 类似W，但是如果文件路径存在，则文件写入失败
const W_PLUS = 'w+';        // 以读写模式打开文件，如果文件不存在则创建
const WX_PLUS = 'wx+';      // 类似w+ 但是如果文件路径存在，则文件读写失败
const A = 'a';              // 以追加模式打开文件，如果文件不存在则创建
const AX = 'ax';            // 类似a, 但是如果文件路径存在，则文件追加失败
const A_PLUS = 'a+';        // 以读取追加模式打开，如果文件不存在则创建
const AX_PLUS = 'ax+';      // 类似 a+, 但是如果文件路径存在，则文件读取追加失败。

// 异步打开文件

// console.info('准备打开文件!');
// fs.open('../file/input.txt', A, (err, fd) => {
//     if(err){
//         return console.info(err);
//     }
//     fs.writeFileSync('../file/input.txt','我心迷茫');
//     console.log('文件打开成功!');
// });

// 获取文件信息

// fs.stat('../file/', (err, stats) => {
//     console.info('stats : ', stats.isFile());
//     if(err){
//         return console.error(err);
//     }
//     console.info(stats);
//     console.info('读取文件信息成功!');
//
//     // 检测文件类型
//     console.info('是否为文件：', stats.isFile());
//     console.info('是否为目录：', stats.isDirectory());
// });

// 写入文件

// console.info('准备写入文件');
// fs.writeFile('../file/input.txt', '我是通过写入的文件内容', function (err) {
//     if(err){
//         return console.error(err);
//     }
//     console.info('数据写入成功!');
//     console.info("--------我是分割线-------------");
//     console.info("读取写入的数据！");
//     fs.readFile('../file/input.txt', function (err, data) {
//         if(err){
//             return console.info(err);
//         }
//         console.info("异步读取文件数据: " + data.toString());
//     });
// });

// 读取文件

// let buf = new Buffer(1024);
//
// console.log("准备打开已存在的文件！");
// fs.open('../file/input.txt', 'r+', function(err, fd) {
//     if (err) {
//         return console.error(err);
//     }
//     console.info("文件打开成功！");
//     console.info("准备读取文件：");
//
//     fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
//         if(err){
//             console.error(err);
//         }
//         console.info(bytes + ' 字节被读取');
//         // 仅输出读取的字节
//         if(bytes > 0){
//             console.info(buf.slice(0, bytes).toString());
//         }
//
//         // 关闭文件
//         fs.close(fd, function (err) {
//             if(err){
//                 console.info(err);
//             }
//             console.info('文件关闭成功');
//         });
//     });
// });

// 截取文件

// let buf = new Buffer(1024);
//
// console.log("准备打开已存在的文件！");
// fs.open('../file/input.txt', 'r+', function(err, fd) {
//     if (err) {
//         return console.error(err);
//     }
//     console.info("文件打开成功!");
//     console.info("截取10字节后的文件内容：");
//
//     // 截取文件
//     fs.ftruncate(fd, 10, function (err) {
//         if(err){
//             console.info(err);
//         }
//         console.info("文件截取成功。");
//         console.info("读取相同的文件。");
//         fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
//             if (err){
//                 console.info(err);
//             }
//
//             // 仅输出读取的字节
//             if(bytes > 0){
//                 console.info(buf.slice(0, bytes).toString());
//             }
//
//             // 关闭文件
//             fs.close(fd, function(err){
//                 if (err){
//                     console.info(err);
//                 }
//                 console.info("文件关闭成功！");
//             });
//         });
//     });
// });

// 删除文件

// console.info('准备删除文件');
// fs.unlink('../file/input3.txt', function (err) {
//     if(err){
//         return console.info(err);
//     }
//     console.info('文件删除成功!');
// });

// 创建目录

// fs.mkdir('/Users/star/test/', function (err) {
//     if(err){
//         return console.error(err);
//     }
//     console.info('目录创建成功。');
// });

// 读取目录

// fs.readdir('/Users/star/', function (err, files) {
//     if(err){
//         return console.error(err);
//     }
//
//     files.forEach(function (file) {
//         console.info(file);
//     })
// });