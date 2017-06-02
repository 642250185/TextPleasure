/**
 * Created by root on 17-5-16.
 */
const co = require('co');
const baseRemote = require('../../baseRemote');
const gameLogic = require('../../../logic/gameLogic');

module.exports = (app) => {return new roleRemote(app)};

class roleRemote extends baseRemote {

    constructor(app){
        super(app);
        this.gamelogic = new gameLogic();
    }

    *enterGameGenerator(uid, params){
        return yield this.gamelogic.enterGameLogic(uid, params);
    }

    *leaveGameGenerator(uid, params){
        return yield this.gamelogic.leaveGameLogic(uid, params);
    }

    *getNextQuestionGenerator(nextQuestionId, params){
        return yield this.gamelogic.nextQuestion(nextQuestionId, params);
    }

}


roleRemote.prototype.enterGame = function (uid, params, callback) {
    co(this.enterGameGenerator(uid, params)).then((result) => {
        callback(null, result);
    }).catch((error) => {
        callback(null, error);
    });
};


roleRemote.prototype.leaveGame = function (uid, params, callback) {
    co(this.leaveGameGenerator(uid, params)).then((result) => {
        callback(null, result);
    }).catch((error) => {
        callback(null, error);
    });
};

roleRemote.prototype.getNextQuestion = function (nextQuestionId, params, callback) {
    co(this.getNextQuestionGenerator(nextQuestionId, params)).then((result) => {
        callback(null, result);
    }).catch((error) => {
        callback(null, error);
    });
};

