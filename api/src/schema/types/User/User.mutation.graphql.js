
const User = `
  extend type Mutation {

    # Login with your facebook token.
    login(
      token: String!
    ): Viewer

    sendMessage(
      channelId: ID!
      message: MessageInput!
    ): Message!

    createChannel(
      name: String!
    ): Channel!

    joinChannel(
      channelId: ID!
    ): Channel!

  }
`;
module.exports = () => [
  User,
  require('./User.graphql.js'),
  require('../Viewer/Viewer.graphql'),
];
