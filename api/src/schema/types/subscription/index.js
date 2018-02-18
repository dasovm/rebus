const Subscription = require('./Subscription');
const Channel = require('./../Channel/Channel.subscription');

module.exports = {
  ...Subscription,
  ...Channel,
};
