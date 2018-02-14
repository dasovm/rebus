const User = `
  extend type Query {
    user(
      userId: ID!
    ): User
  }
`;
module.exports = () => [
  User,
];
