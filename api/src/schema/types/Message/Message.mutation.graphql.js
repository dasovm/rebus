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

const Message = `
  extend type Mutation {
    sendMessage(
      channelId: ID!
      message: MessageInput!
    ): Message!

  }
`;
module.exports = () => [
  Message,
  MessageInput,
  MessageInputType,
];
