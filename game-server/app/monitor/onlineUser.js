/**
 * Created by star on 2017/6/28.
 */

module.exports = function (opts) {
    return new onlineUser(opts);
};

let moduleId = "onlineUser";
module.exports.moduleId = moduleId;

let onlineUser = function (opts) {
    this.app = opts.app;
    this.type = 'pull';
    this.interval = 10;
};

onlineUser.prototype.masterHandler = function (agent, msg) {
    if(!msg){
        agent.notifyByType("connector", moduleId);
    } else {
        agent.set(msg.serverId+moduleId, msg);
    }
};

onlineUser.prototype.monitorHandler = function (agent, msg) {
    let sessionService = this.app.get("sessionService");
    let uidmap = sessionService.service.uidMap;

    let allUserIds = Object.keys(uidmap);
    let uidInfos = new Array();
    for(let i = 0; i < allUserIds.length; i++) {
        let uid = allUserIds[i];
        let infos = uidmap[uid];
        let uidInfo =
            {
                uid:infos[0].uid,
                frontendId:infos[0].frontendId,
                userName:infos[0].settings.userName,
                loginTime:infos[0].settings.loginTime
            };
        uidInfos.push(uidInfo);
    }
    agent.notify(moduleId, {serverId: agent.id, infos: uidInfos});
};

onlineUser.prototype.clientHandler = function (agent, msg, cb) {
    let connectors = this.app.getServersByType('connector');
    let users = new Array();
    for(let i = 0; i < connectors.length; i++){
        let co = connectors[i];
        let key= co.id + moduleId;
        let oneConnectorUsers = agent.get(key);
        for(let j = 0; j < oneConnectorUsers.length; j++){
            let user = oneConnectorUsers.infos[j];
            users.push(user);
        }
    }
    let returnData = {
        result: users
    };
    cb(null, returnData);
};


