/**
 * Created by root on 17-5-12.
 */
const _ = require('lodash');
const baseHandler = require('../../baseHandler');
const language = require('../../../../../shared/language');

module.exports = (app) => {return new gateHandler(app)};

class gateHandler extends baseHandler{

    constructor(app){
        super(app);
    }

    getConnector(msg, session, cb){
        const servers = this.app.getServersByType('connector');
        if(_.isEmpty(servers)){
            cb(null, {
                host: '',
                port: 0,
                message: language.gate.serverEmpty
            });
        } else {
            cb(null, {
                host: servers[0].clientHost,
                port: servers[0].clientPort,
                message: language.common.successfully
            });
        }
    }

}