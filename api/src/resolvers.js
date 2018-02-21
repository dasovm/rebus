const Query = require('./schema/types/query');
const Mutation = require('./schema/types/mutation');
const Subscription = require('./schema/types/subscription');
const User = require('./schema/types/User/User');
const Message = require('./schema/types/Message/Message');
const Content = require('./schema/types/Message/Content');
const Date = require('./schema/types/scalars/Date');
const Channel = require('./schema/types/Channel/Channel');

module.exports = {
  Query,
  Mutation,
  Subscription,
  User,
  Date,
  Message,
  Content,
  Channel,
};
