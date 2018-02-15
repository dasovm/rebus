const User = `
  extend type Subscription {
    message(
      channelId: ID!
    ): Message!
  }
`;
module.exports = () => [
  User,
];
