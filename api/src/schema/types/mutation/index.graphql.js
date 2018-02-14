const Mutation = require('./Mutation.graphql');
const User = require('./../User/User.mutation.graphql');

module.exports = () => [
  Mutation,
  User,
];
