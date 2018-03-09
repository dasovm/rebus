const { UserChannelConnection } = require('./../persistance/schema');

/**
 * Removes user from channel
 * @param channelId
 * @param userId
 * @returns {Promise<null>}
 */
const leaveChannel = (channelId, userId) => new Promise((resolve, reject) => {
  UserChannelConnection.findOneAndRemove({ channelId, userId }, err => {
    if (err) {
      reject(err);
      return;
    }
    resolve(null);
  });
});

module.exports = leaveChannel;
