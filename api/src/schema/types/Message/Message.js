const { getUser } = require('./../../../data/user');
const { getChannel } = require('./../../../data/channel');

module.exports = {
  sender: ({ userId }) => getUser(userId),
  channel: ({ channelId }) => getChannel(channelId),
  content: ({ text, gifs }) => {
    if (gifs && gifs.length > 0) {
      return {
        type: 'REBUS',
        gifs,
      };
    }
    return {
      type: 'TEXT',
      text,
    };
  },
};
