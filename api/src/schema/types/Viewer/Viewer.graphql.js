const Viewer = `
  type Viewer {
    token: String
    user: User
  }
`;

module.exports = () => [
  Viewer,
  require('./../User/User.graphql'),
];
