const config = require('./../config/secrets');
const plivo = require('plivo');
const phloClient = new plivo.Client(config.authId, config.authToken);
let ctrl = {
    async connectPlivoClient(connectFrom, connectTo, duration) {
        let resp = null;
        await phloClient.calls.create(
            connectFrom, // from
            connectTo, // to
            "https://s3.amazonaws.com/static.plivo.com/answer.xml", // answer url
            {
                answerMethod: "GET",
                timeLimit : duration
            },
        ).then(function (response) {
            const {message, requestUuid} = response;
            resp = {
                message,
                requestUuid
            };
            console.log('response after plivo connect call--', resp);
        }, function (err) {
            console.error(err);
        }); 
        return resp; 
    }
}
module.exports = ctrl;