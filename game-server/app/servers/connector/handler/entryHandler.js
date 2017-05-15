
module.exports = (app) => {return new entryHandler(app)};

class entryHandler {

	constructor(){

	}

	login(msg, session, callback){
        callback(null, {msg: 'test login'});
	}

    publish(msg, session, callback){
        const result = {
            topic: 'publish',
            payload: JSON.stringify({code: 200, msg: 'publish message is ok.'})
        };
        callback(null, result);
	}

    subscribe(msg, session, callback){
        const result = {
            topic: 'subscribe',
            payload: JSON.stringify({code: 200, msg: 'subscribe message is ok.'})
        };
        callback(null, result);
    }

}