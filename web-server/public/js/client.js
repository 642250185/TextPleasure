/**
 * Created by root on 17-5-24.
 */

var answer;
var question;
var nickName;
var base = 500;
var increase = 250;
var pomelo = window.pomelo;

function addMessage(from, text) {
    var messageElement = $(document.createElement("table"));
    messageElement.addClass("message");
    var content = '<tr>' +
        '  <td class="questionFrom">' + '问题: ' + question + '</td>' +
        '  <td class="answerText">' + '    &nbsp;&nbsp;&nbsp;&nbsp;回答: ' + answer + '</td>' +
        '</tr>';
    messageElement.html(content);
    //the log is the stream that we view
    $("#history").append(messageElement);
    base += increase;
    scrollDown(base);
};

function scrollDown(base) {
    window.scrollTo(0, base);
};

$(document).ready(function () {
    setToolStatus(false);
    setGodieStatus(false);

    /** ----------->>> 接受广播处理 <<<-----------*/
    /**
     * 玩家进入游戏
     */
    pomelo.on("onEnterGame", function (data) {
        console.info('玩家上线通知: ', data);
        $(".online").text(data.player.onlinePlayerNum);
    });

    /**
     * 玩家自己
     */
    pomelo.on("onEnterGameForSelf", function (data) {
        console.info('玩家上线初始化数据: ', data);
        initPlayerAndQuestionInfo(data);
    });

    /**
     * 测试广播
     */
    pomelo.on("onTest", function (data) {
        console.info('测试广播: ', data);

    });

    /**
     * 玩家离开
     */
    pomelo.on("onLeaveGame", function (data) {
        console.info('玩家下线通知: ', data);
        $(".online").text(data.onlinePlayerNum);
    });

    /**
     * 下一个问题信息
     */
    pomelo.on("onNextQuestion", function (data) {
        question = $(".question").text();
        addMessage(question, answer);
        $(".question").text(data.nextQuestion.description);
        $(".answerA").attr("value", data.nextQuestion.option1);
        $(".answerB").attr("value", data.nextQuestion.option2);

        // 给隐藏属性设置值
        $(".hiddenA").attr("value", data.nextQuestion.option1NextQuestion);
        $(".hiddenB").attr("value", data.nextQuestion.option2NextQuestion);
        $(".questionId").attr("value", data.nextQuestion.questionId);
    });

    /**
     * 玩家信息
     */
    pomelo.on("onPlayerProperty", function (data) {
        // console.info('设置玩家的攻击和防御数据: ', data);
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
                    setRegisterStatus(false);
                    setToolStatus(true);
                });
            });
        })
    });



    // 处理选项一
    $(".answerA").click(function () {
        var answerA = $(".answerA").attr("value");
        answer = answerA;
        var nextQuestionId = $(".hiddenA").attr("value");
        var questionId = $(".questionId").attr("value");
        var route = "role.roleHandler.answer";
        pomelo.request(route, {
            nextQuestionId: nextQuestionId,
            answer: answerA,
            questionId: questionId,
        }, function (data) {});
    });

    $(".answerB").click(function () {
        var answerB = $(".answerB").attr("value");
        answer = answerB;
        var nextQuestionId = $(".hiddenB").attr("value");
        var questionId = $(".questionId").attr("value");
        var route = "role.roleHandler.answer";
        pomelo.request(route, {
            nextQuestionId: nextQuestionId,
            answer: answerB,
            questionId: questionId
        }, function (data) {});
    });


    $("#import").click(function(){//点击导入按钮，使files触发点击事件，然后完成读取文件的操作。
        $("#files").click();
    });

});


function import2(){
    var selectedFile = document.getElementById("files").files[0];//获取读取的File对象
    console.info(' >>>>>> selectedFile : ', selectedFile);
    var name = selectedFile.name; //读取选中文件的文件名
    var size = selectedFile.size; //读取选中文件的大小
    console.info(" >>>>>>>> 文件名 : " + name + " 大小 ： " + size);

    var reader = new FileReader();//这里是核心！！！读取操作就是由它完成的。
    reader.readAsText(selectedFile);//读取文件的内容

    reader.onload = function(){
        console.error('读取出来的二进制文件 : ',this.result);//当读取完成之后会回调这个函数，然后此时文件的内容存储到了result中。直接操作即可。

        // 解析二进制文件
        var iii = new Uint8Array(reader.result);
        console.info('iii : ', iii);
        let buff = new flatbuffers.ByteBuffer(this.result);
        console.info('buff : ', buff);

        // var data = new Uint8Array(reader.result);
        // var buf = new flatbuffers.ByteBuffer(data);

        let monster = xone.genflat.LoginRequest.getRootAsLoginRequest(buff);
        console.info(' msgID :%j, username :%j, password :%j ', monster.msgID(), monster.username(), monster.password());
    };


}

// 获得所有的服务器列表
function getConnector(cb) {
    var route = "gate.gateHandler.getConnector";
    pomelo.init({
        host: window.location.hostname,
        port: 3009,
        log: true
    }, function () {
        pomelo.request(route, {
            username: "zhangsan"
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
 * 玩家上线后，设置玩家的信息及首个问答数据。
 * @param data
 */
function initPlayerAndQuestionInfo(data) {
    // 玩家信息
    $(".status .name").text(data.player.username);
    $(".status .defense").text(data.player.defense);
    $(".status .attack").text(data.player.attack);
    var playerLv = setPlayerLevel(data.player.level);
    $(".status .level").text(playerLv);

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
    if(data.player.defense <= 0){
        setToolStatus(false);
        setGodieStatus(true);
        setHistoryStatus(false);
    } else {
        $(".status .defense").text(data.player.defense);
        $(".status .attack").text(data.player.attack);
        var playerLevel = setPlayerLevel(data.player.level);
        $(".status .level").text(playerLevel);
    }
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
 * 设置历史消息区的隐藏和关闭
 * @param status
 */
function setHistoryStatus(status) {
    if(status){
        $("#history").show();
    } else {
        $("#history").hide();
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

/**
 * 设置登陆区域的隐藏和关闭
 */
function setRegisterStatus(status) {
    if(status){
        $("#register").show();
    } else {
        $("#register").hide();
    }
}

/**
 * 等级设置
 * @param level
 * @returns {*}
 */
function setPlayerLevel(level) {
    switch(level) {
        case 1 : return "新秀";
            break;
        case 2 : return "少侠";
            break;
        case 3 : return "大侠";
            break;
        case 4 : return "掌门";
            break;
        case 5 : return "宗师";
            break;
        default: return "盟主";
            break;
    }
}