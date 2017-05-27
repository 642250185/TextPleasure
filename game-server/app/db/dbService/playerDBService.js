/**
 * Created by root on 17-5-16.
 */
const utils = require('../../../utils/commonUtils');
const playerModle = require('../modle/playerModle');

class playerDBService {

    constructor(){}

    *addPlayer(params){
        const playerId = utils.v1();
        return yield playerModle.createPlayer(playerId, params);
    }

    *getPlayerByName(userName){
        return yield playerModle.findPlayerByUserName(userName);
    }

    *getPlayerByPlayerId(playerId){
        return yield playerModle.findPlayerByPlayerId(playerId);
    }

}



module.exports = playerDBService;