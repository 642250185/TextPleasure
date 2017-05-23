/**
 * Created by root on 17-5-23.
 */

const _ = require('lodash');
let roomSchema = require('../schema/roomSchema');
const utils = require('../../../utils/commonUtils');


class roomModle {

    constructor(){

    }

    static * createRoom(roomId, uid){
        return new Promise((resolve, reject) => {
            roomSchema.findOne({roomId: roomId},(err, roomDoc) => {
                if(_.isEmpty(roomDoc)){
                    let room = new roomSchema();
                    room.roomId = roomId;
                    room.roomList = [uid];
                    room.createDate = utils.formatDate(new Date());
                    roomSchema.create(room, (err, doc) => {
                        if(err) reject(err);
                        resolve(doc);
                    });
                } else {
                    roomDoc.roomList.push(uid);
                    roomDoc.save((err, doc) => {
                        if(err) reject(err);
                        resolve(doc);
                    });
                }
            });
        });
    }

    static * findRoomByRoomId(roomId){
        return new Promise((resolve, reject) => {
            roomSchema.findOne({roomId: roomId}, (err, doc) => {
                if(err) reject(err);
                resolve(doc);
            });
        });
    }

    static * delPlayerByUid(roomId, uid){
        return new Promise((resolve ,reject) => {
            roomSchema.findOne({roomId: roomId}, (err, doc) => {
                doc.roomList = utils.removeByValue(doc.roomList, uid);
                doc.save((err, doc) => {
                    if(err) reject(err);
                    resolve(doc);
                });
            });
        });
    }


}



module.exports = roomModle;