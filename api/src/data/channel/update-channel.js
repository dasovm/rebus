const { Channel } = require('./../persistance/schema');
const { validateChannelColor, validateChannelName } = require('./validation-rules');

/**
 * Creates a channel
 * @param {ID} channelId
 * @param {Object} changes
 * @param {String} changes.channelName
 * @param {String} changes.channelColor
 * @returns {Promise<null>}
 */
const updateChannel = (
  channelId,
  { channelName, channelColor },
) => new Promise((resolve, reject) => {
  if (channelName) {
    try {
      validateChannelName(channelName);
    } catch (nameValidationError) {
      reject(nameValidationError);
      return;
    }
  }

  if (channelColor) {
    try {
      validateChannelColor(channelColor);
    } catch (colorValidationError) {
      reject(colorValidationError);
      return;
    }
  }

  Channel.findByIdAndUpdate(
    channelId,
    { $set: { name: channelName, color: channelColor } },
    (updateError, channel) => {
      if (updateError) {
        reject(updateError);
        return;
      }

      resolve(null);
    },
  );
});

module.exports = updateChannel;
