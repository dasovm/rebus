const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();
const SOMETHING_CHANGED_TOPIC = 'something_changed';

let i = 0;
setInterval(() => {
  pubsub.publish(SOMETHING_CHANGED_TOPIC, { messages: i });
  i += 1;
}, 1000);

module.exports = {
  // messages: {
  //   subscribe: () => pubsub.asyncIterator(SOMETHING_CHANGED_TOPIC),
  // },
};
