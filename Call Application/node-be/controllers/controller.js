const db = require('./../models');
const UserDetail = db.userDetails;
const CallLog = db.callLogs;
const triggerPlivoCall = require('./triggerCall');
const _ = require('lodash');

// Create and Save new user detail
let ctrl = {
    userCreate: async (req, res, next) => {
        const {name, connectFrom, connectTo} = req.body;
        const dialler = {
            userName: name,
            userContact: connectFrom,
        };
        const receiver = {
            userName: "dummy",
            userContact: connectTo,
        };
        try {
            const isDiallerPresent = await UserDetail.findByPk(dialler.userContact);
            const isReceiverPresent = await UserDetail.findByPk(receiver.userContact);
            if(_.isNull(isDiallerPresent)){
                await UserDetail.create(dialler);
            }
            if(_.isNull(isReceiverPresent)){
                await UserDetail.create(receiver);
            }
            next();
        } catch(e) {
            return(e);
        }
    },
    logCreate: async (req, res) => {
        const {connectFrom, connectTo, duration} = req.body;
        const callDetail = {
            callerId: connectFrom,
            receiverId: connectTo,
            callDuration: duration
        };
        try {
            const respConnect = await triggerPlivoCall.connectPlivoClient(connectFrom, connectTo, duration);
            console.log('respConnect--', respConnect);
            const callLogData = await CallLog.create(callDetail);
            console.log('callLogData---', callLogData, callDetail);
            let msg = "";
            if(respConnect && callLogData){
                msg = "Success, Saved to DB!";
            } else if(_.isNull(callLogData)){
                msg = "Couldn't save to db"
            }
            return res.status(200).json({ data: respConnect, msg});
        } catch(e) {
            return(e);
        }
    },
}

module.exports = ctrl;
