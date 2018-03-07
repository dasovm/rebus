const { isLoggedIn, extractUserIdFromContext, notAuthorizedError } = require('./../../../auth/authorization');
const { sendMessage } = require('./../../../data/message');
const { publishMessage } = require('./../../../data/channel');
const { requestGifs } = require('./../../../lib/giphy');


const handleRebusMessage = message => {
  console.log(message);
  if (message.type === 'REBUS') {
    // TODO fix proper text input from user
    return requestGifs(message.text, 1).then(gifs => ({ ...message, gifs }))
      .then(args => {
        console.log(args);
        return args;
      });
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
