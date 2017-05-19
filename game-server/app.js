const pomelo = require('pomelo');
let Code = require('../shared/code');
let language = require('../shared/language');
const initialization = require('./app/initial/initialization');


/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'TextPleasure');
app.set('baseInitialization', new initialization(app));

app.set('errorHandler', function (err, msg, resp, session, cb) {
    cb(null, {
        code: Code.failed,
        msg: language.requestError
    });
});

app.configure('development|production', 'gate|connector', function(){
  app.set('connectorConfig', {
      connector : pomelo.connectors.hybridconnector,
      heartbeat : 3,
      useDict : true,
      useProtobuf : true
    });
});

app.configure('development|production', 'role', function(){

});



app.start();

process.on('uncaughtException', function (err) {
  console.error(' Caught exception: ' + err.stack);
});
