/**
 * Created by root on 17-5-16.
 */

const baseHandler = require('../../baseHandler');
module.exports = (app) => {return new roleHandler(app)};

class roleHandler extends baseHandler{

    answer(msg, session, callback){
        console.info('answer ...... , :', msg);
        callback(null, msg);
    }

}