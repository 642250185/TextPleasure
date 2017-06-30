/**
 * Created by star on 2017/6/19.
 */

// Buffer 类创建

// let buf = new Buffer(10);
//
// console.info('buf > ',buf);
//
// let buf2 = new Buffer([10,20,30,40,50]);
//
// console.info('buf2 > ',buf2);
//
// let buf3 = new Buffer("www.runoob.com","utf-8");
//
// console.info('buf3 > ',buf3);
// console.error('buf3.toJSON(buf3) > ',buf3.toJSON(buf3));

// 写入缓冲区

// let buf = new Buffer(256);
// let len = buf.write("www.runoob.com");
//
// console.info('写入字节数: ', len);

// 读取缓冲区

// let buf2 = new Buffer(26);
// for(let i = 0; i < 26; i++){
//     buf2[i] = i + 97;
// }
//
// console.info(buf2.toString('ascii'));
// console.info(buf2.toString('ascii',0,5));
// console.info(buf2.toString('utf8',0,5));
// console.info(buf2.toString('undefined',0,5));

// Buffer 转换成 JSON 对象

// let buf = new Buffer('www.runoob.com');
// let json = buf.toJSON(buf);
//
// console.info(json);

// 缓冲区合并

// let buffer1 = new Buffer('菜鸟教程 ');
// let buffer2 = new Buffer('www.runoob.com');
//
// let buffer3 = Buffer.concat([buffer1, buffer2]);
// console.info('buffer3 :', buffer3.toString());

// 缓冲区比较

// let buffer1 = new Buffer('ABC');
// let buffer2 = new Buffer('ABCD');
// let result = buffer1.compare(buffer2);
//
// if(result < 0) {
//     console.log(buffer1 + " 在 " + buffer2 + "之前");
// } else if(result == 0){
//     console.log(buffer1 + " 与 " + buffer2 + "相同");
// } else {
//     console.log(buffer1 + " 在 " + buffer2 + "之后");
// }

// 拷贝缓冲区

// let buffer1 = new Buffer('ABC');
// // 拷贝一个缓冲区
// let buffer2 = new Buffer(3);
// buffer1.copy(buffer2);
// console.info('buffer2 content: ', buffer2.toString());

// 缓冲区裁剪
// 语法 > buf.slice([start[, end]]);

// let buffer1 = new Buffer('runoob');
// // 剪切缓冲区
// let buffer2 = buffer1.slice(0, 2);
//
// console.info('buffer2 content: ', buffer2.toString());

//











