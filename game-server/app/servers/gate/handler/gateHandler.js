/**
 * Created by root on 17-5-12.
 */

module.exports = (app) => {return new gateHandler(app)};

class gateHandler {

    constructor(app){

    }

    getConnector(msg, session, callback){
        callback(null, {msg: 'test getConnector'});
    }

}
















