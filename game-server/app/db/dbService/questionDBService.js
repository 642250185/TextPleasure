/**
 * Created by root on 17-5-26.
 */
const utils = require('../../../utils/commonUtils');
const questionModle = require('../modle/questionModle');

class questionDBService {

    constructor(){

    }

    *addQuestion(params){
        return yield questionModle.createQuestion(params);
    }

    *getQuestionById(questionId){
        console.info('5 getQuestionById ..............');
        return yield questionModle.findQuestionById(questionId);
    }

}


module.exports = questionDBService;