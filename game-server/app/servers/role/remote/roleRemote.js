/**
 * Created by root on 17-5-16.
 */
const co = require('co');
const baseRemote = require('../../baseRemote');
const roleHandler = require('../handler/roleHandler');
const channelService = require('../../../initial/channelServiceController');

module.exports = (app) => {return new roleRemote(app)};

class roleRemote extends baseRemote {

    constructor(app){
        super(app);
        //this.roleHandler = new _roleHandler();
    }

    * enterGameGenerator(uid, params){
        console.info('enterGameGenerator');
        let aaa = yield roleHandler.enterGame(uid, params);
        console.info('aaa: %j', aaa);
        return 1;
    }
}


roleRemote.prototype.enterGame = function (uid, params, callback) {
    co(this.enterGameGenerator(uid, params)).then((result) => {
        console.info(result);
    });
};