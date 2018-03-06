const { isLoggedIn, extractUserIdFromContext, notAuthorizedError } = require('./../../../auth/authorization');
const { sendMessage } = require('./../../../data/message');
const { publishMessage } = require('./../../../data/channel');
const { requestGifs } = require('../../../../../giphy-integration');


const handleRebusMessage = (message) => {
  if (message.type === 'REBUS') {
    // TODO fix proper text input from user
    message.gifs = requestGifs('Cat', 1);
  }
  return message;
};
module.exports = {
  sendMessage: (_, { channelId, message }, ctx) => {
    if (!isLoggedIn(ctx)) {
      throw notAuthorizedError();
    }

    const userId = extractUserIdFromContext(ctx);

    return Promise.resolve(message)
      .then(handleRebusMessage)
      .then(msg => sendMessage(userId, channelId, msg))
      .then(msg => publishMessage(channelId, msg));
  },
};
