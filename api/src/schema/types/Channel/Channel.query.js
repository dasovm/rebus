const { getAllChannels, getChannel } = require('./../../../data/channel');

module.exports = {
  channels: () => getAllChannels(),
  channel: (_, { channelId }) => getChannel(channelId),
};
