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
            player.username = params.username;
            player.defense = params.defense;
            player.attack = params.attack;
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

    static * findPlayerByPlayerId(playerId){
        return new Promise((resolve, reject) => {
            playerSchema.findOne({playerId: playerId}, (err, doc) => {
                if(err) reject(err);
                resolve(doc);
            });
        });
    }

    static * updatePlayerByPlayerId(playerId, params){
        return new Promise((resolve, reject) => {
            try {
                playerSchema.findOne({playerId: playerId}, (err, doc) => {
                    doc.attack = params.attack;
                    doc.defense = params.defense;
                    doc.save((err, value) => {
                        if(err) reject(err);
                        resolve(value);
                    });
                });
            } catch (err){
                console.error('err: %j', err);
                reject(err);
            }
        });
    }

}



module.exports = playerModle;