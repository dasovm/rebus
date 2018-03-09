const {
  createChannel, joinChannel, getChannel, leaveChannel, updateChannel,
} = require('./../../../data/channel');
const { isLoggedIn, extractUserIdFromContext } = require('./../../../auth/authorization');

module.exports = {
  createChannel: (_, { name, color }, ctx) => {
    if (!isLoggedIn(ctx)) {
      throw new Error('Not authorized');
    }
    const userId = extractUserIdFromContext(ctx);

    return createChannel(name, color)
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


  leaveChannel: (_, { channelId }, ctx) => {
    if (!isLoggedIn(ctx)) {
      throw new Error('Not authorized');
    }
    const userId = extractUserIdFromContext(ctx);
    return leaveChannel(channelId, userId)
      .then(() => getChannel(channelId));
  },


  updateChannel: (_, { channelId, name, color }, ctx) => {
    if (!isLoggedIn(ctx)) {
      throw new Error('Not authorized');
    }
    return updateChannel(channelId, { channelName: name, channelColor: color })
      .then(() => getChannel(channelId));
  },

};
