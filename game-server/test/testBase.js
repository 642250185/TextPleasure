/**
 * Created by star on 2017/6/9.
 */

// function setPlayerLevel(level){
//     if(level <= 60){
//         return 1;
//     } else if(level < 150){
//         return 2;
//     } else if(level < 230){
//         return 3;
//     } else if(level < 300){
//         return 4;
//     } else if(level < 370){
//         return 5;
//     } else {
//         return 6;
//     }
// }
//
// console.info(setPlayerLevel(61));

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

console.info(setPlayerLevel(0));










