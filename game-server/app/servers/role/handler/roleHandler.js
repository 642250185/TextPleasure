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
        co(this.answerOption(msg, session, callback));
    }

    *answerOption(msg, session, callback){
        const nextQuestionId = msg.nextQuestionId;
        const questionId = msg.questionId;
        let params = {
            serverId: session.get("serverId"),
            uid: session.uid,
            questionId: questionId
        };
        this.app.rpc.role.roleRemote.getNextQuestion(session, nextQuestionId, params, (err, qdoc) => {
            callback(null, qdoc);
        });
    }

}