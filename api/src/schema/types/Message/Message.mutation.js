const { isLoggedIn, extractUserIdFromContext, notAuthorizedError } = require('./../../../auth/authorization');
const { sendMessage } = require('./../../../data/message');
const { publishMessage } = require('./../../../data/channel');


const handleRebusMessage = (message) => {
  if (message.type === 'REBUS') {
    // todo implement giphy
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
