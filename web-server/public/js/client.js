/**
 * Created by root on 17-5-24.
 */


var nickName;
var pomelo = window.pomelo;
var localPlayer = "localPlayer";

$(document).ready(function () {
    setToolStatus(false);
    setGodieStatus(false);
    pomelo.on("onEnterGame", function (data) {
        console.info('玩家上线通知: ', data);
        var _player = localStorage.getItem(localPlayer);
        if(_player.playerId == data.player.playerId){
            $(".status .name").text(data.player.username);
            $(".status .defense").text(data.player.defense);
            $(".status .attack").text(data.player.attack);
        }
    });

    pomelo.on("onLeaveGame", function (data) {
        console.info('玩家下线通知: ', data);
    });

    pomelo.on("onNextQuestion", function (data) {
        console.info("下一个问题的数据",data);
        $(".question").text(data.nextQuestion.description);
        $(".answerA").attr("value", data.nextQuestion.option1);
        $(".answerB").attr("value", data.nextQuestion.option2);

        // 给隐藏属性设置值
        $(".hiddenA").attr("value", data.nextQuestion.option1NextQuestion);
        $(".hiddenB").attr("value", data.nextQuestion.option2NextQuestion);

        $(".questionId").attr("value", data.nextQuestion.questionId);
    });

    pomelo.on("onPlayerProperty", function (data) {
        console.info('设置玩家的攻击和防御数据: ', data);
        setPlayerInfo(data);
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
                    var clientPlayer = localStorage.getItem(localPlayer);
                    if(clientPlayer == null){
                        initPlayerAndQuestionInfo(data);
                        localStorage.setItem(localPlayer, JSON.stringify(data.player));
                    } else {
                        if(clientPlayer.playerId != data.player.playerId){
                            alert('请换一个浏览器，已有玩家登录');
                            return;
                        } else {
                            initPlayerAndQuestionInfo(data);
                            localStorage.setItem(localPlayer, JSON.stringify(data.player));
                        }
                    }
                    hideRegister();
                    setToolStatus(true);
                });
            });
        })
    });



    // 处理选项一
    $(".answerA").click(function () {
        var answerA = $(".answerA").attr("value");
        var nextQuestionId = $(".hiddenA").attr("value");
        var questionId = $(".questionId").attr("value");
        var route = "role.roleHandler.answer";
        pomelo.request(route, {
            nextQuestionId: nextQuestionId,
            answer: answerA,
            questionId: questionId
        }, function (data) {
            console.info('answerA > Click: ', data);
        });
    });

    $(".answerB").click(function () {
        var answerB = $(".answerB").attr("value");
        var nextQuestionId = $(".hiddenB").attr("value");
        var questionId = $(".questionId").attr("value");
        var route = "role.roleHandler.answer";
        pomelo.request(route, {
            nextQuestionId: nextQuestionId,
            answer: answerB,
            questionId: questionId
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


/**
 * 设置结束区域的隐藏和关闭
 * @param status
 */
function setGodieStatus(status) {
    if(status){
        $("#godie").show();
    } else {
        $("#godie").hide();
    }
}

/**
 * 设置工具栏区域的隐藏和关闭
 * @param status
 */
function setToolStatus(status) {
    if(status){
        $("#tool").show();
    } else {
        $("#tool").hide();
    }
}

function hideRegister() {
    $("#register").hide();
}

/**
 * 玩家上线后，设置玩家的信息及首个问答数据。
 * @param data
 */
function initPlayerAndQuestionInfo(data) {
    // 玩家信息
    $(".status .name").text(data.player.username);
    $(".status .defense").text(data.player.defense);
    $(".status .attack").text(data.player.attack);
    // 问答信息
    $(".question").text(data.question.description);
    $(".answerA").attr("value", data.question.option1);
    $(".answerB").attr("value", data.question.option2);
    //
    $(".hiddenA").attr("value", data.question.option1NextQuestion);
    $(".hiddenB").attr("value", data.question.option2NextQuestion);
    // 问题本身ID
    $(".questionId").attr("value", data.question.questionId);
}

/**
 * 设置玩家的攻击和防御属性值
 * @param data
 */
function setPlayerInfo(data) {
    console.info('>>> data: >>> %j', data);
    if(data.player.defense <= 0){
        setToolStatus(false);
        setGodieStatus(true);
    } else {
        $(".status .defense").text(data.player.defense);
        $(".status .attack").text(data.player.attack);
    }
}