const User = `
  extend type Mutation {

    # Login with your facebook token.
    login(
      token: String!
    ): Viewer

    # Register your selected values.
    setValues(
      categories: [InputValueCategory!]!
    ): User

    # Match with a user.
    matchWithUser(
      userId: ID!
    ): User

    setNotificationToken(
      token: String!
    ): User
  }
`;
module.exports = () => [
  User,
  require('./../Value/InputValueCategory.graphql'),
  require('./User.graphql.js'),
  require('../Viewer/Viewer.graphql'),
];
