const { Message } = require('./../persistance/schema');

// todo validate message
const validateMessage = message => null;

const sendMessage = (userId, channelId, message) => new Promise((resolve, reject) => {
  try {
    validateMessage(message);
  } catch (validationError) {
    reject(validationError);
    return;
  }

  const messageModel = new Message({
    ...message,
    userId,
    channelId,
    sentAt: new Date(),
  });

  messageModel.save(saveError => {
    if (saveError) {
      reject(saveError);
      return;
    }

    resolve(messageModel);
  });
});


module.exports = sendMessage;
