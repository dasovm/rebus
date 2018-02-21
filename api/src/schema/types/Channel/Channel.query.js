const { getAllChannels } = require('./../../../data/channel');

module.exports = {
  channels: () => getAllChannels(),
};
