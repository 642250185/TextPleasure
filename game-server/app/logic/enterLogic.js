/**
 * Created by root on 17-5-23.
 */

const code = require('../../../shared/code');
const language = require('../../../shared/language');
const channelService = require('../initial/channelServiceController');
const roomDBService = require('../db/dbService/roomDBService');

class enterLogic {

    constructor(){
        this.roomService = new roomDBService();
    }

    *enterGameLogic(uid, params) {
        console.info('uid, params: %j', uid, params);
        let room = yield this.roomService.addRoom(code.sceneOne, uid);
        console.info('roomList.length: %j', room.roomList.length);
        channelService.addPlayerUUIDToScene(code.sceneOne, uid, params.serverId, null);
        if(room.roomList.length > 1){
            const enterGameInfo = {
                code: code.enterGameCode,
                message: language.connector.enterGame,
                uid: uid
            };
            channelService.pushMessageByUid(code.enterGame, params.serverId, room.roomList, code.sceneOne, enterGameInfo, null);
        }
        return room;
    }

    *leaveGameLogic(uid, params){
        console.info('uid, params: %j', uid, params);
        let room = yield this.roomService.removePlayerByUid(code.sceneOne, uid);
        console.info('roomList.length: %j', room.roomList.length);
        if(room.roomList.length >= 1){
            const leaveGameInfo = {
                code: code.leaveGameCode,
                message: language.connector.leaveGame,
                uid: uid
            };
            channelService.pushMessageByUid(code.leaveGame, params.serverId, room.roomList, code.sceneOne, leaveGameInfo, null);
        }
        channelService.leaveUidAndSceneId(code.sceneOne, uid, params.serverId, null);
        return room;
    }

}



module.exports = enterLogic;