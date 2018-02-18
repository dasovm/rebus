const Subscription = require('./Subscription.graphql');
const Channel = require('./../Channel/Channel.subscription.graphql');

module.exports = () => [
  Subscription,
  Channel,
];
