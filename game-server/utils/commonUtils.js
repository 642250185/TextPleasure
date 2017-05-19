/**
 * Created by root on 17-3-24.
 */

let moment = require('moment');
let uuid = require('node-uuid');
let nickName = require('../../shared/nickName');

let commomUtil = module.exports;

/**
 * 得到唯一ID
 */
commomUtil.v1 = () => {
    return uuid.v1().replace(/\-/g, '');
};

/**
 * 随机获取一个名字
 */
commomUtil.getNickname = function(){
    let index = this.areaRandom(360, 1);
    return nickName[index];
};

/**
 * 格式化时间
 * @param data
 */
commomUtil.formatDate = (data) => {
    return moment(data).format('YYYY-MM-DD HH:mm:ss');
};

/**
 * 区域随机数
 * @param max 最大值
 * @param min 最小值 + 1
 */
commomUtil.areaRandom = (max, min) => {
    return Math.ceil(Math.random() * (max - min) + min);
};

/**
 * 获取指定区间内的浮点随机数，指定保留小数位
 * @param max 最大值
 * @param min 最小值 可以为小数
 * @param num 保留小数后xx位
 */
commomUtil.areaRandomAndHoldNum = (max, min, num) => {
    return (Math.ceil(Math.random() * (max - min) + min)).toFixed(num);
};

/**
 * 获取两个日期的时间差
 * @param nowDate
 * @param oldDate
 * @returns {number}
 */
commomUtil.dateDiff = (nowDate, oldDate) => {
    let type1 = typeof nowDate;
    let type2 = typeof oldDate;
    if(type1 == 'string') {
        nowDate = stringToTime(nowDate);
    } else if(nowDate.getTime) {
        nowDate = nowDate.getTime();
    }
    if(type2 == 'string') {
        oldDate = stringToTime(oldDate);
    } else if(oldDate.getTime) {
        oldDate = oldDate.getTime();
    }
    return (nowDate - oldDate) / 1000;//结果是秒
};

/**
 * 删除数组中的指定的值
 * @param arr
 * @param val
 * @returns {*}
 */
commomUtil.removeByValue = (arr, val) => {
    for(let i = 0; i < arr.length; i++){
        if(arr[i] == val){
            arr.splice(i, 1);
            break;
        }
    }
    return arr;
};

/**
 * 日期组成字符串的UUID
 * @returns {string}
 */
commomUtil.toDateUUID = () => {
    let d = new Date();
    let day = d.getDate()+"";
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let milliSecondes = d.getMilliseconds();
    return day+hours+minutes+milliSecondes;
};


function stringToTime(string){
    let f = string.split(' ', 2);
    let d = (f[0] ? f[0] :' ').split('-', 3);
    let t = (f[1] ? f[1] :' ').split(':', 3);
    return (new Date(
        parseInt(d[0], 10) || null,
        (parseInt(d[1], 10) || 1)-1,
        parseInt(d[2], 10) || null,
        parseInt(t[0], 10) || null,
        parseInt(t[1], 10) || null,
        parseInt(t[2], 10) || null
    )).getTime();
};


// -----------------------------------工具方法
/**
 * 获取另外一个信息
 * @param playerId
 * @param roomPlayer
 */
commomUtil.getOtherPlayer = (playerId, roomPlayer) => {
    let player = null;
    roomPlayer.forEach((item, index) => {
        let _playerId = item.split('*')[0];
        if(playerId != _playerId){
            player = item;
        }
    });
    return player;
};



