const { getUsersInChannel } = require('./../../../data/channel');
const { getUsers } = require('./../../../data/user');
const { getMessages } = require('./../../../data/message');

module.exports = {
  members: ({ _id: channelId }) => getUsersInChannel(channelId)
    .then(getUsers),

  messages: ({ _id: channelId }, { skip, limit }) => {
    return getMessages(channelId, skip, limit + 1)
      .then(messages => ({
        messages: messages.slice(0, -1),
        hasMore: messages.length > limit,
      }));
  },
};
