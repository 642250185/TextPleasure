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

    *getNextQuestionGenerator(questionId, params){
        console.info('3 getNextQuestionGenerator ..............');
        return yield this.gamelogic.nextQuestion(questionId, params);
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

roleRemote.prototype.getNextQuestion = function (questionId, params, callback) {
    console.info('2 getNextQuestion ..............');
    co(this.getNextQuestionGenerator(questionId, params)).then((result) => {
        callback(null, result);
    }).catch((error) => {
        callback(null, error);
    });
};

