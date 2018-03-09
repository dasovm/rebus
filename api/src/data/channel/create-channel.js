const { Channel } = require('./../persistance/schema');
const { validateChannelColor, validateChannelName } = require('./validation-rules');

/**
 * Creates a channel
 * @param {String} channelName
 * @param {String} channelColor
 * @returns {Promise<Channel>}
 */
const createChannel = (channelName, channelColor) => new Promise((resolve, reject) => {
  try {
    validateChannelName(channelName);
    validateChannelColor(channelColor);
  } catch (validationError) {
    reject(validationError);
    return;
  }


  const channel = new Channel({
    name: channelName,
    color: channelColor,
    createdAt: new Date(),
  });

  channel.save(saveError => {
    if (saveError) {
      reject(saveError);
      return;
    }
    resolve(channel);
  });
});

module.exports = createChannel;
