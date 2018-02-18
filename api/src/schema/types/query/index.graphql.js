const Query = require('./Query.graphql');
const User = require('./../User/User.query.graphql');
const Viewer = require('./../Viewer/Viewer.query.graphql');
const Channel = require('./../Channel/Channel.query.graphql');

module.exports = () => [
  Query,
  User,
  Viewer,
  Channel,
];
