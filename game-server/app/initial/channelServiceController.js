/**
 * Created by root on 17-5-15.
 */

const pomelo = require('pomelo');

let sceneIdObject = {};
let channelService = null;

class channelServiceController {

    /**
     * 启动广播服务
     */
    static channelServiceStart(){
        channelService = pomelo.app.get('globalChannelService');
        channelService.start(function (err, result) {
            if(err){
                console.log('start globalChannelService is err', err);
            }
        });
    };

    /**
     * 停止广播服务
     */
    static channelServiceStop(){
        if(channelService != null){
            channelService.stop();
        }
    };

    /**
     * 玩家加入频道
     * @param sceneId   频道名称
     * @param playerId    玩家ID
     * @param sid       服务ID
     * @param callback
     */
    static addPlayerUUIDToScene(sceneId, playerId, sid, callback) {
        let oldSceneId = sceneIdObject[playerId];
        if(oldSceneId && oldSceneId != sceneId){
            this.leaveUidAndSceneId(oldSceneId, playerId, sid, function (err, result) {
                if(err){
                    console.info('leaveUidAndSceneId leaveUid fail => ',err);
                }
            });
            sceneIdObject[playerId] = sceneId;
            channelService.add(sceneId, playerId, sid, callback);
        }
    };

    /**
     * 玩家离开频道
     * @param sceneId   频道名称
     * @param playerId    玩家ID
     * @param sid       服务ID
     * @param callback
     */
    static leaveUidAndSceneId(sceneId, playerId, sid, callback){
        channelService.leave(sceneId, playerId, sid, callback);
    };

    /**
     * 广播数据给场景内指定玩家
     * @param route     路由协议
     * @param sid       服务ID
     * @param uid       指定广播对象
     * @param sceneId   频道名称
     * @param opts
     * @param callback
     */
    static pushMessageByUid(route, sid, playerId, sceneId, opts, callback){
        // console.error(`send Msg ${playerId} ${sid} add ${sceneId}`);
        channelService.pushMessageForUid('connector', sid, route, Array.isArray(playerId)?playerId:[playerId], sceneId, opts, callback);
    };

    /**
     * 广播数据给指定场景的所有玩家
     * @param route     路由协议
     * @param sceneId   频道名称
     * @param opts
     * @param callback
     */
    static pushMessageBySceneId(route, sceneId, opts, callback){
        channelService.pushMessage('connector', route, opts, sceneId, callback);
    }

    /**
     * 通过sceneId 获取在当前场景中的所有玩家id
     * @param sceneId   频道名称
     */
    static getPlayerMemberBySceneId(sceneId){
        channelService.getMemberByChannelName('connector', sceneId, (err, members) => {
            if(err){
                return null;
            }
            return members;
        });
    }

    static getchannelMembers(sceneId, playerId){
        channelService.getMember(sceneId, playerId, (err, count) => {
            console.info('err, count: %j', err, count);
            if(err){return err}
            return count;
        });
    }



}



module.exports = channelServiceController;