/**
 * Created by root on 17-5-23.
 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let RoomSchema = new Schema({
    roomId: {
        type: String
    },
    roomList: {
        type: Array
    },
    createDate: {
        type: Date
    }
});



module.exports = mongoose.model('room',RoomSchema);