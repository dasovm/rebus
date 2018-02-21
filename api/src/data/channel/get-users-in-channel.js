const getChannelConnections = require('./get-channel-connections');

const getUserIDsInChannel = channelId => getChannelConnections({ channelId })
  .then(connections => connections.map(({ userId }) => userId));


module.exports = getUserIDsInChannel;
