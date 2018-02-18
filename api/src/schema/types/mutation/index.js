const Mutation = require('./Mutation');
const User = require('./../User/User.mutation');
const Channel = require('./../Channel/Channel.mutation');
const Message = require('./../Message/Message.mutation');

module.exports = {
  ...Mutation,
  ...User,
  ...Channel,
  ...Message,
};
