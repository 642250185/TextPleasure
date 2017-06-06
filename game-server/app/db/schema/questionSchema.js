/**
 * Created by root on 17-5-26.
 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let questionSchema = new Schema({
    questionId: {
        type: Number
    },
    option1NextQuestion: {  // 问题id索引
        type: Number
    },
    option2NextQuestion: {  // 问题y坐标索引
        type: Number
    },
    description: {
        type: String
    },
    defense: {  // 防御
        type: Number
    },
    attack: {   // 攻击
        type: Number
    },
    option1: {  //
        type: String
    },
    option2: {
        type: String
    },
    createDate: {
        type: Date
    }
});



module.exports = mongoose.model('question',questionSchema);