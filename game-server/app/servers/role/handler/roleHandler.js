/**
 * Created by root on 17-5-16.
 */

const baseHandler = require('../../baseHandler');
module.exports = (app) => {return new roleHandler(app)};

class roleHandler {


    enterGame(uid, params){
        console.info('roleHandler ...... uid, :', uid);
        return new Promise((resolve, reject) => {
            resolve(uid);
        });
    }

}

// module.exports = roleHandler;