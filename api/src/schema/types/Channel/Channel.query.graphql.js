const Channel = `
  extend type Query {
    channels: [Channel]!
  }
`;
module.exports = () => [
  Channel,
  require('./Channel.graphql'),
];
