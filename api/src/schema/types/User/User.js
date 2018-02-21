const { getUsersChannels } = require('./../../../data/channel');

module.exports = {
  channels: ({ _id: userId }) => getUsersChannels(userId),
};
