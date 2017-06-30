/**
 * Created by star on 2017/6/30.
 */

// console.info(__filename);

// console.info(__dirname);

// function printHello(){
    // console.info('hello world');
// }

// let t = setTimeout(printHello, 2000);
// console.info('t > ', t);

// clearTimeout(t);

// let t = setInterval(printHello, 3000);

// clearTimeout(t);

// console.time();

// console.timeEnd();

// console.trace();

// -------------->>>>> process
/**
 * process
 * 用户描述当前Node.js 进程状态的对象
 */

// process.on('exit', function (code) {
//     setTimeout(function () {
//         console.info('该代码不会执行');
//     }, 0);
//     console.info('退出码为:', code);
// });
// console.info('程序执行结束');


// process.stdout.write("hello world!"+ "\n");

// process.argv.forEach(function (val, index, array) {
//     console.info(index + " : " + val);
// });

// console.info(process.platform);

// console.info(process.execPath);

// 输出当前目录
console.info('当前目录： ' + process.cwd());

// 输出当前版本
console.info('当前版本： ' + process.version);

// 输出内存使用情况
console.info('内存使用情况' + JSON.stringify(process.memoryUsage()));



















