const Subscription = require('./Subscription.graphql');
const User = require('./../User/User.subscription.graphql');

module.exports = () => [
  Subscription,
  User,
];
