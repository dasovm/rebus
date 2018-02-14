const Query = require('./Query.graphql');
const User = require('./../User/User.query.graphql');
const Viewer = require('./../Viewer/Viewer.query.graphql');

module.exports = () => [
  Query,
  User,
  Viewer,
];
