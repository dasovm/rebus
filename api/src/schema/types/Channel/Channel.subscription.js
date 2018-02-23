const { subscribeToMessages, publishMessage } = require('./../../../data/channel');
const randomText = require('random-text-faces');




module.exports = {
  message: {
    subscribe: (_, { channelId }) => subscribeToMessages(channelId),
  },
};
