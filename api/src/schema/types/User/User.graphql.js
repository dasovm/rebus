const User = `
  type User {
    _id: ID!

    name: String!

    # Url to picture
    picture: String

    channels: [Channel]!
    
  }
`;

module.exports = () => [
  User,
  require('./../Channel/Channel.graphql'),
  require('./../scalars/Date.graphql'),
];
