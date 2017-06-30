/**
 * Created by star on 2017/6/19.
 */
let fs = require('fs');

// let data = fs.readFileSync('./file/input.txt');
// console.info('data : %j', data);
//
// console.info('data.toString : %j', data.toString());


fs.readFile('./file/input.txt', (err, data) => {
    try {
        console.error(data.toString());
    } catch (err) {
        throw new Error;
    }
});
console.info('程序运行结束');
