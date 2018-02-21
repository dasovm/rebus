const { Channel } = require('./../persistance/schema');
const { ChannelNameError } = require('./errors');


const validateChannelName = name => {
  if (name.length < 2) {
    throw new ChannelNameError(`Channel name too short. Must be longer than two characters, was ${name.length}.`);
  }

  if (name.length > 63) {
    throw new ChannelNameError(`Channel name too long. Must not be longer than 63 characters, was ${name.length}`);
  }
};

/**
 * Creates a channel
 * @param {String} channelName
 * @returns {Promise<Channel>}
 */
const createChannel = channelName => new Promise((resolve, reject) => {
  try {
    validateChannelName(channelName);
  } catch (validationError) {
    reject(validationError);
    return;
  }


  const channel = new Channel({
    name: channelName,
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
