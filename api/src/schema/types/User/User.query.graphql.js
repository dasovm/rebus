const User = `
  extend type Query {
    channels: [Channel]!
  }
`;
module.exports = () => [
  User,
];
