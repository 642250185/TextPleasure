/**
 * Created by star on 2017/6/30.
 */

const dns = require('dns');

dns.lookup('www.github.com', function onLookup (err, address, family) {
    console.info('IP : ', address);
    dns.reverse(address, function (err, hostnames) {
        if(err){
            console.error(err.stack);
        }
        console.info('反向解析 ' + address + ' : ' + JSON.stringify(hostnames));
    });
});

























