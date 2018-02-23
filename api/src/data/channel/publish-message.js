const { pubsub, channelTopic } = require('./pubsub');


const publishMessage = (channelId, message) => {
  pubsub.publish(channelTopic(channelId), { message });
  return message;
};


module.exports = publishMessage;
