const Subscription = require('./Subscription');
const User = require('./../User/User.subscription');

module.exports = {
  ...Subscription,
  ...User,
};
