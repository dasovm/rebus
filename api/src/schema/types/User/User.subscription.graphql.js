const User = `
  extend type Subscription {
    messages: Int
  }
`;
module.exports = () => [
  User,
];
