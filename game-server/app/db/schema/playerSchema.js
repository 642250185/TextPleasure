/**
 * Created by root on 17-5-16.
 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PlayerSchema = new Schema({
    playerId: {
        type: String
    },
    username: {
        type: String
    },
    defense: {  // 防御
        type: Number
    },
    attack: {   // 攻击
        type: Number
    },
    level: {    // 等级
        type: Number,
        default: 0
    },
    createDate: {
        type: Date
    }
});



module.exports = mongoose.model('player',PlayerSchema);