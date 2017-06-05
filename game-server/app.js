
const xlsx = require('xlsx');
const pomelo = require('pomelo');
const Code = require('../shared/code');
const language = require('../shared/language');
const initialization = require('./app/initial/initialization');
const questionModle = require('./app/db/modle/questionModle');

/**
 * Init app for client.
 */
let app = pomelo.createApp();
app.set('name', 'textPleasure');
app.set('baseInitialization', new initialization(app));

app.set('errorHandler', function (err, msg, resp, session, cb) {
    cb(null, {
        code: Code.FAIL,
        msg: language.common.requestError
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
    const workbook = xlsx.readFile("./config/data/questionData.xlsx");
    const sheetNames = workbook.SheetNames;
    console.info('sheetNames: %j', sheetNames);
    const workSheet = workbook.Sheets[sheetNames];
    const work = xlsx.utils.sheet_to_json(workSheet);
    console.info('joinQuestion : ', questionModle.joinQuestion(work));
});


app.start();

process.on('uncaughtException', function (err) {
  console.error(' Caught exception: ' + err.stack);
});
