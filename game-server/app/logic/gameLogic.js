/**
 * Created by root on 17-5-23.
 */

const code = require('../../../shared/code');
const language = require('../../../shared/language');
const channelService = require('../initial/channelServiceController');

const roomDBService = require('../db/dbService/roomDBService');
const playerDBService = require('../db/dbService/playerDBService');
const questionDBService = require('../db/dbService/questionDBService');

class enterLogic {

    constructor(){
        this.roomService = new roomDBService();
        this.playerService = new playerDBService();
        this.questionService = new questionDBService();
    }

    *enterGameLogic(uid, params) {
        console.info('uid, params: %j', uid, params);
        let room = yield this.roomService.addRoom(code.sceneOne, uid);
        console.info('roomList.length: %j', room.roomList.length);
        channelService.addPlayerUUIDToScene(code.sceneOne, uid, params.serverId, null);
        const playerId = uid.split("*")[0];
        const player = yield this.playerService.getPlayerByPlayerId(playerId);
        const question = yield this.questionService.getQuestionById(1);
        if(room.roomList.length > 1){
            const enterGameInfo = {
                code: code.enterGameCode,
                message: language.connector.enterGame,
                player: {
                    username: player.username,
                    defense: player.defense,
                    attack: player.attack
                }
            };
            channelService.pushMessageByUid(code.onEnterGame, params.serverId, room.roomList, code.sceneOne, enterGameInfo, null);
        }
        return {player: player, question: question};
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
            channelService.pushMessageByUid(code.onLeaveGame, params.serverId, room.roomList, code.sceneOne, leaveGameInfo, null);
        }
        channelService.leaveUidAndSceneId(code.sceneOne, uid, params.serverId, null);
        return room;
    }

    /**
     * 获得下一个问题
     * @param questionId
     * @param params
     * @returns {*}
     */
    *nextQuestion(questionId, params){
        console.info('4 nextQuestion ..............');
        let questionDoc = yield this.questionService.getQuestionById(questionId);
        console.info('questionDoc: %j', questionDoc);
        const nextQuestionInfo = {
            code: code.nextQuestion,
            message: language.logic.nextQuestion,
            question: questionDoc,
        };
        channelService.pushMessageByUid(code.onNextQuestion, params.serverId, params.uid, code.sceneOne, nextQuestionInfo, null);
        return questionDoc;
    }


}



module.exports = enterLogic;