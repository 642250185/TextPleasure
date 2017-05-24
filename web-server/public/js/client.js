/**
 * Created by root on 17-5-24.
 */

var pomelo = window.pomelo;

// 获得所有的服务器列表
function getConnector(cb) {
    var route = "gate.gateHandler.getConnector";
    pomelo.init({
        host: window.location.hostname,
        port: 3009,
        log: true
    }, function () {
        pomelo.request(route, {
            
        }, function (data) {
            if(data.code === 500){
                console.error(data.message);
                return;
            }
            cb(data.host, data.port);
        });
    });
}

function loginGame() {
    
}






$(document).ready(function () {
    // 请求index.html页面，页面内容加载结束后，直接请求gate服务器

    pomelo.on("onEnterGame", function (data) {
        console.info('玩家上线通知: ', data);
    });

    pomelo.on("onLeaveGame", function (data) {
        console.info('玩家下线通知: ', data);
    });

});



















