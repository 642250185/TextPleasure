/**
 * Created by root on 17-6-13.
 */

const protobuf = require('protobufjs');

protobuf.load("../config/Product.proto", (err, root) => {
    if(err){
        throw err;
    }
    let Product = root.lookup("Ecommerce.Product");
    console.info('Product: %j', Product);

    const data = {
        available: true,
        name: 'ApplePen',
        desc: 'The combination of Apple and Pen',
        price: 100.0
    };

    // 包装资料后回传 Buffer 格式（二进制形式）
    let msgbuffer = Product.encode(data).finish();
    console.error('msgbuffer : %j', msgbuffer);


    // 解开
    let nowData = Product.encode(msgbuffer);
    console.info('nowData : %j', nowData);
});














