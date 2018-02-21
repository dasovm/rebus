const { UserChannelConnection } = require('./../persistance/schema');

/**
 * Adds user to channel
 * @param channelId
 * @param userId
 * @returns {Promise<UserChannelConnection>}
 */
const joinChannel = (channelId, userId) => new Promise((resolve, reject) => {
  const connection = new UserChannelConnection({
    userId,
    channelId,
  });

  connection.save(saveError => {
    if (saveError) {
      reject(saveError);
      return;
    }

    resolve(connection);
  });
});

module.exports = joinChannel;
