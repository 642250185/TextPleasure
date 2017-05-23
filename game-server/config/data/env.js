/**
 * Created by root on 17-5-15.
 */

const IP = '127.0.0.1';

module.exports.mongodb = {
    'url'    : `mongodb://${IP}:27017/TextPleasure`,
    'options': {
        db: {
            'native_parser': true
        },
        server: {
            poolSize       : 5,
            socketOptions  : {keepAlive: 1}
        }
    }
};

module.exports.redis = {
    identity           : 'gameMirror',
    enableOfflineQueue : true,
    auth_pass: '123456',
    password:"",
    port: null,
    host: IP,
    db: 0,
};