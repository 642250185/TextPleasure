/**
 * Created by root on 17-5-23.
 */
const utils = require('../../../utils/commonUtils');
const roomModle = require('../modle/roomModle');

class roomDBService {

    constructor(){}

    *addRoom(roomId, uid){
        return yield roomModle.createRoom(roomId, uid);
    }

    *getRoomByRoomId(roomId){
        return yield roomModle.findRoomByRoomId(roomId);
    }

    *removePlayerByUid(roomId, uid){
        return yield roomModle.delPlayerByUid(roomId, uid);
    }

}



module.exports = roomDBService;