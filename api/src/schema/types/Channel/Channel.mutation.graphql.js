const Channel = `
  extend type Mutation {
    createChannel(
      name: String!
      color: String
    ): Channel!

    joinChannel(
      channelId: ID!
    ): Channel!

    leaveChannel(
      channelId: ID!
    ): Channel!

    updateChannel(
      channelId: ID!
      name: String
      color: String
    ) : Channel!
  }
`;
module.exports = () => [
  Channel,
  require('./Channel.graphql'),
];
