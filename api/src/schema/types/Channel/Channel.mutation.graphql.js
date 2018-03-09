const Channel = `
  extend type Mutation {
    createChannel(
      name: String!
    ): Channel!

    joinChannel(
      channelId: ID!
    ): Channel!

    leaveChannel(
      channelId: ID!
    ): Channel!
  }
`;
module.exports = () => [
  Channel,
  require('./Channel.graphql'),
];
