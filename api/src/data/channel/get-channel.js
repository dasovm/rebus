const { Channel, UserChannelConnection } = require('./../persistance/schema');


const getChannel = channelId => new Promise((resolve, reject) => {
  Channel.findOne({ _id: channelId }, (findError, channel) => {
    if (findError) {
      reject(findError);
      return;
    }
    resolve(channel);
  });
});


const getChannels = channelIds => new Promise((resolve, reject) => {
  Channel.find({ _id: { $in: channelIds } }, (findError, channels) => {
    if (findError) {
      reject(findError);
      return;
    }

    resolve(channels);
  });
});


const getAllChannels = () => new Promise((resolve, reject) => {
  Channel.find({}, (findError, channels) => {
    if (findError) {
      reject(findError);
      return;
    }
    resolve(channels);
  });
});


const getChannelConnections = userId => new Promise((resolve, reject) => {
  UserChannelConnection.find({ userId }, (findError, connections) => {
    if (findError) {
      reject(findError);
      return;
    }

    resolve(connections);
  });
});


const getUsersChannels = userId => getChannelConnections(userId)
  .then(connections => getChannels(connections.map(({ channelId }) => channelId)));


module.exports = {
  getChannel,
  getChannels,
  getAllChannels,
  getUsersChannels,
};
