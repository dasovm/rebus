const { pubsub, channelTopic } = require('./pubsub');


const publishMessage = (channelId, message) => pubsub.publish(channelTopic(channelId), message);


module.exports = publishMessage;
