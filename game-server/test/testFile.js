/**
 * Created by root on 17-6-5.
 */
const xlsx = require('xlsx');


// const workbook = xlsx.readFile("./file/文字问答.xlsx");

const workbook = xlsx.readFile("../config/data/文字问答.xlsx");

const sheetNames = workbook.SheetNames;
console.info('sheetNames: %j', sheetNames);
const workSheet = workbook.Sheets[sheetNames];
const aaa = xlsx.utils.sheet_to_json(workSheet);
console.error('aaa: %j', aaa);
console.error('aaa.length: %j', aaa.length);

console.info('questionId: %j', aaa[0].questionId);
console.info('description: %j', aaa[0].description);
console.info('defense: %j', aaa[0].defense);
console.info('attack: %j', aaa[0].attack);
console.info('option1: %j', aaa[0].option1);
console.info('option2: %j', aaa[0].option2);
console.info('option1NextQuestion: %j', aaa[0].option1NextQuestion);
console.info('option2NextQuestion: %j', aaa[0].option2NextQuestion);
