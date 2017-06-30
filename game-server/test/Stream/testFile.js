/**
 * Created by root on 17-6-5.
 */

const fs = require('fs');
const flatbuffers = require('../../../shared/src/index');



// const xlsx = require('xlsx');
// // const workbook = xlsx.readFile("./file/文字问答.xlsx");
// const workbook = xlsx.readFile("../config/data/文字问答.xlsx");
//
// const sheetNames = workbook.SheetNames;
// console.info('sheetNames: %j', sheetNames);
// const workSheet = workbook.Sheets[sheetNames];
// const aaa = xlsx.utils.sheet_to_json(workSheet);
// console.error('aaa: %j', aaa);
// console.error('aaa.length: %j', aaa.length);
//
// console.info('questionId: %j', aaa[0].questionId);
// console.info('description: %j', aaa[0].description);
// console.info('defense: %j', aaa[0].defense);
// console.info('attack: %j', aaa[0].attack);
// console.info('option1: %j', aaa[0].option1);
// console.info('option2: %j', aaa[0].option2);
// console.info('option1NextQuestion: %j', aaa[0].option1NextQuestion);
// console.info('option2NextQuestion: %j', aaa[0].option2NextQuestion);

// 读取文件
// let fs = require('fs');
//
// fs.readFile('./file/input.txt', (err, data) => {
//     if(err){
//         console.error('err3 : %j', err.stack);
//         return;
//     }
//     console.info(data.toString());
// });



// 写入文件
console.info('--------->>>> 准备写入文件');

// fs.writeFileSync('./file/test.mon', '[0,1,2,3,4,5,6,7,8,9,a]', (err) => {
//     console.info(err);
    // if(err) {
    //     return console.info(err);
    // }
    // console.log("数据写入成功！");
    // console.log("--------我是分割线-------------");
    // console.log("读取写入的数据！");
    //
    // fs.readFile('./file/test.mon', (err, data) => {
    //     if(err){
    //         return console.info(err);
    //     }
    //     console.info('异步读取文件数据: %j', data.toString());
    // });

// });


let test = flatbuffers.compileSchema(fs.readFileSync('../../shared/bfbs/testc.bfbs'));
let generated = test.generate({x: 1, y: 2, z: 3});

let parsed = test.parse(generated);

console.info('parsed : ', parsed);
















