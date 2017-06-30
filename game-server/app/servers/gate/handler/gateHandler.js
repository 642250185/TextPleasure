/**
 * Created by root on 17-5-12.
 */
const _ = require('lodash');
const baseHandler = require('../../baseHandler');
const code = require('../../../../../shared/code');
const language = require('../../../../../shared/language');

module.exports = (app) => {return new gateHandler(app)};

class gateHandler extends baseHandler{

    constructor(app){
        super(app);
    }

    getConnector(msg, session, cb){
        console.info('msg : %j', msg);
        const servers = this.app.getServersByType('connector');
        if(_.isEmpty(servers)){
            cb(null, {
                code: code.FAIL,
                message: language.gate.serverEmpty,
                host: '',
                port: 0
            });
        } else {
            cb(null, {
                code: code.OK,
                message: language.common.successfully,
                host: servers[0].clientHost,
                port: servers[0].clientPort
            });
        }
    }

}