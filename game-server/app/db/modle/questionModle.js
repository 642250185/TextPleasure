/**
 * Created by root on 17-5-26.
 */

const utils = require('../../../utils/commonUtils');
let questionSchema = require('../schema/questionSchema');

class questionModle {

    constructor(){

    }

    static * createQuestion(params){
        return new Promise((resolve, reject) => {
            let question = new questionSchema();
            question.questionId = params.questionId;
            question.index_x = params.index_x;
            question.index_y = params.index_y;
            question.description = params.description;
            question.defense = params.defense;
            question.attack = params.attack;
            question.option1 = params.option1;
            question.option2 = params.option2;
            question.createDate = utils.formatDate(new Date());
            questionSchema.create(question, (err, doc) => {
                if(err) reject(err);
                resolve(doc);
            });
        });
    }

    static joinQuestion(work){
        console.info('work: %j', work);
        console.info('work.size: %j', work.length);
        /*return new Promise((resolve, reject) => {
            let question = new questionSchema();
            question.questionId = params.questionId;
            question.index_x = params.index_x;
            question.index_y = params.index_y;
            question.description = params.description;
            question.defense = params.defense;
            question.attack = params.attack;
            question.option1 = params.option1;
            question.option2 = params.option2;
            question.createDate = utils.formatDate(new Date());
            questionSchema.create(question, (err, doc) => {
                console.info('err, doc: %j', err, doc);
                if(err) reject(err);
                resolve(doc);
            });
        });*/
        return work.length;
    }

    static * findQuestionById(questionId){
        return new Promise((resolve, reject) => {
            questionSchema.findOne({questionId: questionId}, (err, doc) => {
                if(err) reject(err);
                resolve(doc);
            });
        });
    }

}



module.exports = questionModle;