const { getUsersInChannel } = require('./../../../data/channel');
const { getUsers } = require('./../../../data/user');
const { getMessages } = require('./../../../data/message');

module.exports = {
  members: ({ _id: channelId }) => getUsersInChannel(channelId)
    .then(getUsers),

  messages: ({ _id: channelId }, { skip, limit }) => getMessages(channelId, skip, limit + 1)
    .then(messages => ({
      messages: messages.length > limit ? messages.reverse().slice(1) : messages.reverse(),
      hasMore: messages.length > limit,
    })),
};
