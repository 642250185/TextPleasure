/**
 * Created by root on 17-5-16.
 */

const utils = require('../../../utils/commonUtils');
let playerSchema = require('../schema/playerSchema');

class playerModle {

    constructor(){

    }

    static * createPlayer(playerId, params){
        return new Promise((resolve, reject) => {
            let player = new playerSchema();
            player.playerId = playerId;
            player.username = utils.getNickname();
            player.createDate = utils.formatDate(new Date());
            playerSchema.create(player, (err, doc) => {
                if(err) reject(err);
                resolve(doc);
            });
        });
    }

    static * findPlayerByUserName(username){
        return new Promise((resolve, reject) => {
            playerSchema.findOne({username: username}, (err, doc) => {
                if(err) reject(err);
                resolve(doc);
            });
        });
    }

}



module.exports = playerModle;