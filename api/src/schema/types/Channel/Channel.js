const { getUsersInChannel } = require('./../../../data/channel');
const { getUsers } = require('./../../../data/user');
const { getMessages } = require('./../../../data/message');

module.exports = {
  members: ({ _id: channelId }) => getUsersInChannel(channelId)
    .then(getUsers),

  messages: ({ _id: channelId }, { skip, limit }) => getMessages(channelId, skip, limit + 1)
    .then(messages => ({
      messages,
      hasMore: messages.length > limit,
    })),
};
