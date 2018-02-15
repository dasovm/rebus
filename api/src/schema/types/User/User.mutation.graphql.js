const MessageInputType = `
  enum MessageInputType {
    TEXT
    REBUS
  }
`;

const MessageInput = `
  input MessageInput {
    text: String!
    type: MessageInputType!
  }
`;

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
  MessageInput,
  MessageInputType,
  require('./../Value/InputValueCategory.graphql'),
  require('./User.graphql.js'),
  require('../Viewer/Viewer.graphql'),
];
