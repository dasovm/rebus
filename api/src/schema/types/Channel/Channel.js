const { getUsersInChannel } = require('./../../../data/channel');
const { getUsers } = require('./../../../data/user');

module.exports = {
  members: ({ _id: channelId }) => getUsersInChannel(channelId)
    .then(getUsers),

  messages: () => {
    throw new Error('Not implemented');
  },
};
