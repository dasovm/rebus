const Viewer = `
  extend type Query {
  
    # Currently authenticated user.
    viewer: Viewer
  }
`;
module.exports = () => [
  Viewer,
  require('./Viewer.graphql'),
];
