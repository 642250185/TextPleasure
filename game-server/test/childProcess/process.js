/**
 * Created by star on 2017/6/30.
 */

const fs = require('fs');
const childProcess = require('child_process');

for(let i = 0; i < 3; i++){
    let workerProcess = childProcess.exec('node support.js'+i, function (error, stdout, stderr) {
        if(error){
            console.info(error.stack);
            console.info('Error code: ', error.code);
            console.info('Signal received: ', error.signal);
        }
        console.info('stdout: ' + stdout);
        console.info('stderr: ' + stderr);
    });
    workerProcess.on('exit', function (code) {
        console.info('子进程已退出，退出码 '+code);
    });
}
















