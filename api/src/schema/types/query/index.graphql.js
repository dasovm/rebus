const Query = require('./Query.graphql');
const Viewer = require('./../Viewer/Viewer.query.graphql');
const Channel = require('./../Channel/Channel.query.graphql');

module.exports = () => [
  Query,
  Viewer,
  Channel,
];
