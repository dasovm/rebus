const Channel = `
  extend type Query {
    channels: [Channel]!
    channel(channelId: ID!): Channel
  }
`;
module.exports = () => [
  Channel,
  require('./Channel.graphql'),
];
