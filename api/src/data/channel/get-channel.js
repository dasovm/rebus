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


const getChannels = channelIds => new Promise((resolve, rjeect) => {
  Channel.find({ _id: { $in: channelIds } }, (findError, channels) => {
    if (findError) {
      reject(findError);
      return;
    }

    resolve(channels);
  });
});


module.exports = {
  getChannel,
  getChannels,
};
