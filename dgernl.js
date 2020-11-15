const users =  require('./users.js');

const handleClientMessage = async (message, responseCallback) => {
    message.success = true;
    responseCallback(message);
};

exports.handleClientMessage = handleClientMessage;