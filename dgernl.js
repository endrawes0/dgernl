const { response } = require('express');
const users =  require('./users.js');

const Interrupts = {
    "help": (callback) => { console.log("Interrupt: Help"); callback(); }
};

const Questions = {
    "who": (message, callback) => {
        let name = message.message;
        let user = users.lookupByName(name);
        let response = "";
        if(user){
            response = "Good to see you, " + name + "! What [action] would you like to do?";
            message.header.user = JSON.stringify(user);
        }else{
            response = "Very nice to meet you, " + name + ". I will remember you next time you visit. ";
            message.header.user = JSON.stringify(users.create(name));
        }
        callback(response);
    }
};

const handleClientMessage = async (message, responseCallback) => {
    let callback = (response) => {
        message.success = true;
        message.response = response;
        responseCallback(message);
    }

    if(Interrupts[message.message]) Interrupts[message.message](callback);
    if(Questions[message.header.questionId]) Questions[message.header.questionId](message, callback);
};

exports.handleClientMessage = handleClientMessage;