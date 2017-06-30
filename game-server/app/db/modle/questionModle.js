/**
 * Created by root on 17-5-26.
 */
const _ = require('lodash');
const utils = require('../../../utils/commonUtils');
let questionSchema = require('../schema/questionSchema');

class questionModle {

    constructor(){

    }

    static * createQuestion(params){
        return new Promise((resolve, reject) => {
            let question = new questionSchema();
            question.questionId = params.questionId;
            question.option1NextQuestion = params.option1NextQuestion;
            question.option2NextQuestion = params.option2NextQuestion;
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
        return new Promise((resolve, reject) => {
            try {
                questionSchema.remove({}, (err, removeQuestionDoc) => {
                    console.info('err : %j , 删除旧数据结果: %d, 受影响行数: %d ', err, removeQuestionDoc.result.ok, removeQuestionDoc.result.n);
                });
                for(let i = 0; i < work.length; i++){
                    let question = new questionSchema();
                    question.questionId = work[i].questionId;
                    question.option1NextQuestion = work[i].option1NextQuestion;
                    question.option2NextQuestion = work[i].option2NextQuestion;
                    question.description = work[i].description;
                    question.defense = work[i].defense;
                    question.attack = work[i].attack;
                    question.option1 = work[i].option1;
                    question.option2 = work[i].option2;
                    question.createDate = utils.formatDate(new Date());
                    questionSchema.create(question, (err, doc) => {
                        // console.info('err, 数据导入: %j', err, _.isEmpty(doc) == false ? "success" : "failure");
                    });
                }
            } catch (err){
                if(err) reject(err);
                resolve(work.length);
            }
        });
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