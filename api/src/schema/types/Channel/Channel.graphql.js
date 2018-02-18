
const MessageConnection = `
  type MessageConnection {
    messages: [Message]!
    hasMore: Boolean!
  }
`;
const Channel = `
  type Channel {
    _id: ID!

    name: String!

    members: [User]!

    messages(skip: Int = 0, limit: Int = 20): MessageConnection!
  }
`;

module.exports = () => [
  Channel,
  MessageConnection,
  require('./../Message/Message.graphql'),
  require('./../User/User.graphql'),
];
