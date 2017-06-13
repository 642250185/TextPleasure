/**
 * Created by root on 17-6-13.
 */

const protobuf = require('protobufjs');
let awesome = require('../config/awesome.proto');
console.info('awesome: %j', awesome);

protobuf.load("../config/awesome.json", (err, root) => {
    if(err){
        throw err;
    }
    let AwesomeMessage = root.lookup("awesome.AwesomeMessage");
    console.info('AwesomeMessage: %j', AwesomeMessage);
});















