/**
 * Created by root on 17-5-16.
 */
const co = require('co');
const baseRemote = require('../../baseRemote');
const enterLogic = require('../../../logic/enterLogic');

module.exports = (app) => {return new roleRemote(app)};

class roleRemote extends baseRemote {

    constructor(app){
        super(app);
        this.enterlogic = new enterLogic();
    }

    *enterGameGenerator(uid, params){
        return yield this.enterlogic.enterGameLogic(uid, params);
    }

    *leaveGameGenerator(uid, params){
        return yield this.enterlogic.leaveGameLogic(uid, params);
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