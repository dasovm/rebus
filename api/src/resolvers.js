const Query = require('./schema/types/query');
const Mutation = require('./schema/types/mutation');
const Subscription = require('./schema/types/subscription');
const User = require('./schema/types/User/User');
const Date = require('./schema/types/scalars/Date');

module.exports = {
  Query,
  Mutation,
  Subscription,
  User,
  Date,
};
