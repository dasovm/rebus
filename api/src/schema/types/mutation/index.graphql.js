const Mutation = require('./Mutation.graphql');
const User = require('./../User/User.mutation.graphql');
const Channel = require('./../Channel/Channel.mutation.graphql');
const Message = require('./../Message/Message.mutation.graphql');

module.exports = () => [
  Mutation,
  User,
  Channel,
  Message,
];
