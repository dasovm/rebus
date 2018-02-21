const { subscribeToMessages, publishMessage } = require('./../../../data/channel');
const randomText = require('random-text-faces');

setInterval(() => {
  publishMessage(1, {
    message: {
      _id: 1,
      content: {
        type: 'Text',
        text: randomText.get(),
      },
    },
  });
}, 1500);


module.exports = {
  message: {
    subscribe: (_, { channelId }) => subscribeToMessages(channelId),
  },
};
