/**
 * Created by root on 17-5-24.
 */


var nickName;
var pomelo = window.pomelo;

$(document).ready(function () {
    hideTool();
    pomelo.on("onEnterGame", function (data) {
        console.info('玩家上线通知: ', data);
        $(".status .name").text(data.player.username);
        $(".status .defense").text(data.player.defense);
        $(".status .attack").text(data.player.attack);
    });

    pomelo.on("onLeaveGame", function (data) {
        console.info('玩家下线通知: ', data);
    });

    pomelo.on("onNextQuestion", function (data) {
        console.info("下一个问题的数据",data);
        $(".question").text(data.question.description);
        $(".answerA").attr("value", data.question.option1);
        $(".answerB").attr("value", data.question.option2);

        // 给隐藏属性设置值
        $(".hiddenA").attr("value", data.question.index_x);
        $(".hiddenB").attr("value", data.question.index_y);
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
                    initPlayerAndQuestionInfo(data);
                    hideRegister();
                    showTool();
                });
            });
        })
    });



    // 处理选项一
    $(".answerA").click(function () {
        var answerA = $(".answerA").attr("value");
        var hidden = $(".hiddenA").attr("value");
        console.info('answerA: ', answerA);
        console.info('hidden: ', hidden);
        var route = "role.roleHandler.answer";
        pomelo.request(route, {
            hidden: hidden,
            answer: answerA
        }, function (data) {
            console.info('answerA > Click: ', data);
        });
    });

    $(".answerB").click(function () {
        var answerB = $(".answerB").attr("value");
        var hidden = $(".hiddenB").attr("value");
        console.info('answerB: ', answerB);
        var route = "role.roleHandler.answer";
        pomelo.request(route, {
            hidden: hidden,
            answer: answerB
        }, function (data) {
            console.info('answerB > Click: ', data);
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

/**
 * 玩家上线后，设置玩家的信息及首个问答数据。
 * @param data
 */
function initPlayerAndQuestionInfo(data) {
    console.info('client >>> data: ', data);
    // 玩家信息
    $(".status .name").text(data.player.username);
    $(".status .defense").text(data.player.defense);
    $(".status .attack").text(data.player.attack);
    // 问答信息
    $(".question").text(data.question.description);
    $(".answerA").attr("value", data.question.option1);
    $(".answerB").attr("value", data.question.option2);

    $(".hiddenA").attr("value", data.question.index_x);
    $(".hiddenB").attr("value", data.question.index_y);

}