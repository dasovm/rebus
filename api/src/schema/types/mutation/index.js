const Mutation = require('./Mutation');
const User = require('./../User/User.mutation');

module.exports = {
  ...Mutation,
  ...User,
};
