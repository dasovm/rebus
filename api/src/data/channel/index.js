module.exports = {
  createChannel: require('./create-channel'),
  ...require('./get-channel'),
  errors: require('./errors'),
  joinChannel: require('./join-channel'),
  subscribeToMessages: require('./subscribe-to-messages'),
  publishMessage: require('./publish-message'),
  getUsersInChannel: require('./get-users-in-channel'),
  leaveChannel: require('./leave-channel'),
};
