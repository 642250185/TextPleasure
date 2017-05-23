/**
 * Created by root on 17-5-23.
 */

const j = "d57b95a03f9611e7bdb579d9b823d328*Molly";

let roomList = [
    "d57b95a03f9611e7bdb579d9b823d328*Molly",
    "d90de4203f9611e7bdb579d9b823d328*Karen"
];

console.info('roomList: %j', roomList);

for(let i = 0; i < roomList.length; i++){
    if(roomList[i] == j){
        roomList.splice(i, 2, "123","234");
        break;
    }
}

console.info('roomList: %j', roomList);












