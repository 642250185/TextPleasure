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
    createDate: {
        type: Date
    }
});



module.exports = mongoose.model('player',PlayerSchema);