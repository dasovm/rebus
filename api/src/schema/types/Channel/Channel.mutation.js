const { createChannel, joinChannel, getChannel } = require('./../../../data/channel');
const { isLoggedIn, extractUserIdFromContext } = require('./../../../auth/authorization');

module.exports = {
  createChannel: (_, { name }, ctx) => {
    if (!isLoggedIn(ctx)) {
      throw new Error('Not authorized');
    }
    const userId = extractUserIdFromContext(ctx);

    return createChannel(name)
      .then(channel => joinChannel(channel._id, userId).then(() => channel));
  },

  joinChannel: (_, { channelId }, ctx) => {

    if (!isLoggedIn(ctx)) {
      throw new Error('Not authorized');
    }
    const userId = extractUserIdFromContext(ctx);
    return joinChannel(channelId, userId)
      .then(() => getChannel(channelId));
  },

};
