const { pubsub, channelTopic } = require('./pubsub');

const subscribeToMessages = channelId => pubsub.asyncIterator(channelTopic(channelId));

module.exports = subscribeToMessages;
