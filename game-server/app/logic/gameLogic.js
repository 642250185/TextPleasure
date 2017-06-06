/**
 * Created by root on 17-5-23.
 */

const code = require('../../../shared/code');
const language = require('../../../shared/language');
const channelService = require('../initial/channelServiceController');

const roomDBService = require('../db/dbService/roomDBService');
const playerDBService = require('../db/dbService/playerDBService');
const questionDBService = require('../db/dbService/questionDBService');

class gameLogic {

    constructor(){
        this.roomService = new roomDBService();
        this.playerService = new playerDBService();
        this.questionService = new questionDBService();
    }

    *enterGameLogic(uid, params) {
        let room = yield this.roomService.addRoom(code.sceneOne, uid);
        channelService.addPlayerUUIDToScene(code.sceneOne, uid, params.serverId, null);
        const playerId = uid.split("*")[0];
        const player = yield this.playerService.getPlayerByPlayerId(playerId);
        const question = yield this.questionService.getQuestionById(1);
        if(room.roomList.length > 1){
            const enterGameInfo = {
                code: code.enterGameCode,
                message: language.connector.enterGame,
                player: {
                    playerId: player.playerId,
                    username: player.username,
                    defense: player.defense,
                    attack: player.attack
                }
            };
            channelService.pushMessageByUid(code.onEnterGame, params.serverId, room.roomList, code.sceneOne, enterGameInfo, null);
        }
        const enterGameForSelfInfo = {
            code: code.enterGameForSelfCode,
            message: language.connector.enterGameForSelf,
            player: player,
            question: question
        };
        channelService.pushMessageByUid(code.onEnterGameForSelf, params.serverId, uid, code.sceneOne, enterGameForSelfInfo, null);
        return {player: player, question: question};
    }

    *leaveGameLogic(uid, params){
        let room = yield this.roomService.removePlayerByUid(code.sceneOne, uid);
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
     * @param nextQuestionId
     * @param params
     * @returns {*}
     */
    *nextQuestion(nextQuestionId, params){
        let currentQuestion = yield this.questionService.getQuestionById(params.questionId);
        let nextQuestion = yield this.questionService.getQuestionById(nextQuestionId);
        let player = yield this.playerService.getPlayerByPlayerId(params.uid.split("*")[0]);
        // 设置玩家的攻击和防御属性
        const questionCombat = {defense: currentQuestion.defense, attack: currentQuestion.attack};
        const playerCombat = {defense: player.defense, attack: player.attack};
        // 玩家回答问题之后，攻击和防御属性改变的值。
        let combat = gameLogic.setPlayerCombat(questionCombat, playerCombat);
        // 将数据存储到玩家，
        console.info('保存玩家之前的数据: %j', player.attack, player.defense);
        let editPlayer = yield this.playerService.editPlayerByPlayerId(player.playerId, combat);
        console.info('保存玩家之后的数据: %j', editPlayer.attack, editPlayer.defense);
        // 将玩家的数据以及问题数据广播到web页面
        const playerInfo = {
            code: code.playerPropertyCode,
            message: language.logic.playerProperty,
            player: editPlayer
        };
        channelService.pushMessageByUid(code.onPlayerProperty, params.serverId, params.uid, code.sceneOne, playerInfo, null);
        const nextQuestionInfo = {
            code: code.nextQuestion,
            message: language.logic.nextQuestion,
            nextQuestion: nextQuestion,
        };
        channelService.pushMessageByUid(code.onNextQuestion, params.serverId, params.uid, code.sceneOne, nextQuestionInfo, null);
        return nextQuestion;
    }

    /**
     * 战斗部分
     * @param question
     * @param player
     * @returns {{attack: number, defense: number}}
     */
    static setPlayerCombat(question, player){
        let defense = player.defense + question.defense;
        if(defense < 0){
            defense = 0;
        } else {
           if(defense > question.attack){
               defense  = defense - question.attack;
           }
        }
        let attack = player.attack + question.attack;
        return {attack: attack, defense: defense}
    }

}



module.exports = gameLogic;