module.exports = {
  // todo: This should also log the user in and connect
  // to correct user if the user has already registered (on this endpoint)

  createChannel: (_, { name }, ctx) => {
    throw new Error('Not implemented');
  },

  joinChannel: (_, { channelId }, ctx) => {
    throw new Error('Not implemented');
  },

};
