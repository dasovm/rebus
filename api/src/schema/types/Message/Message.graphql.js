const Message = `
  type Message {
    _id: ID!

    sender: User!

    channel: Channel!

    sentAt: Date!

    content: Content
    
  }
`;


module.exports = () => [
  Message,
  require('./Content.graphql'),
  require('./../Channel/Channel.graphql'),
  require('./../scalars/Date.graphql'),
];
