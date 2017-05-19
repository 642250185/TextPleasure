const co = require('co');
const _ = require('lodash');
const baseHandler = require('../../baseHandler');
const language = require('../../../../../shared/language');
const playerDBService = require('../../../db/dbService/playerDBService');

module.exports = (app) => {return new entryHandler(app)};

class entryHandler extends baseHandler {

	constructor(app){
        super(app);
	    this.playerService = new playerDBService();
	}

	login(msg, session, callback){
        co(this.loginAsync(msg, session, callback));
	}

	*loginAsync(msg, session, callback){
	    let player = yield this.playerService.getPlayerByName(msg.username);
	    let serverId = this.app.get("serverId");
	    let uid = null;
        if(_.isEmpty(player)){  // 新玩家注册
            player = yield this.playerService.addPlayer({});
        }
        uid = `${player.playerId}*${player.username}`;
        session.bind(uid);
        session.set('playerId', player.playerId);
        session.set('username', player.username);
        session.set('serverId', serverId);
        session.pushAll(err => {return err});
        session.on('closed', (session, reason) => {
            if (!session.uid) {
                return;
            }
            co(this.logOut(session));
        });
        this.app.rpc.role.roleRemote.enterGame(session, uid, {}, null);
        callback(null, player);
    }

    *logOut(session){
        const uid = session.uid;
        session.unbind(uid);
    }
}