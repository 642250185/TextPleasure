/**
 * Created by root on 17-5-24.
 */


var nickName;
var pomelo = window.pomelo;

$(document).ready(function () {
    hideTool();
    pomelo.on("onEnterGame", function (data) {
        console.info('玩家上线通知: ', data);
    });

    pomelo.on("onLeaveGame", function (data) {
        console.info('玩家下线通知: ', data);
    });

    // 处理登录按钮
    $(".login").click(function () {
        nickName = $(".nickName").attr("value");
        console.info('nickName: ', nickName);
        if(nickName.length > 10 || nickName.length == 0){
            console.error('昵称过长或昵称未输入');
            return false;
        }

        getConnector(function (host, port) {
            pomelo.init({
                host: host,
                port: port,
                log: true
            }, function () {
                var route = "connector.entryHandler.login";
                pomelo.request(route, {
                    username: nickName
                }, function (data) {
                    console.info('login > data:', data);
                    hideRegister();
                    showTool();
                });
            });
        })
    });



    // 处理选项一
    $(".answerA").click(function () {
        var answerA = $(".answerA").attr("value");
        console.info('answerA: ', answerA);
        var route = "role.roleHandler.answer";
        pomelo.request(route, {
            index : 1,
            answer: answerA
        }, function (data) {
            console.info('answerA > Click: ', data);
        });
    });

    $(".answerB").click(function () {
        var answerB = $(".answerB").attr("value");
        console.info('answerB: ', answerB);
        var route = "role.roleHandler.answer";
        pomelo.request(route, {
            index : 2,
            answer: answerB
        }, function (data) {
            console.info('answerB > Click: ', data);
            /**/
        });
    });





});


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
            // 关闭连接
            pomelo.disconnect();
            if(data.code === 500){
                console.error(data.message);
                return;
            }
            cb(data.host, data.port);
        });
    });
}

function hideTool() {
    $("#tool").hide();
}

function showTool() {
    $("#tool").show();
}

function hideRegister() {
    $("#register").hide();
}















