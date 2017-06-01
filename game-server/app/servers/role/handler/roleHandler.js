/**
 * Created by root on 17-5-16.
 */
const co = require('co');
const baseHandler = require('../../baseHandler');


module.exports = (app) => {return new roleHandler(app)};

class roleHandler extends baseHandler{

    constructor(app){
        super(app);
    }

    answer(msg, session, callback){
        console.info('answer ...... , :', msg);
        co(this.answerOption(msg, session, callback));
    }

    *answerOption(msg, session, callback){
        const questionId = msg.hidden;
        let params = {
            serverId: session.get("serverId"),
            uid: session.uid
        };
        console.info('1 params: %j', params);
        this.app.rpc.role.roleRemote.getNextQuestion(session, questionId, params, (err, qdoc) => {
            console.info('qdoc: %j', qdoc);
            callback(null, qdoc);
        });
    }

}