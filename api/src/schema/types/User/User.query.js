const { getUser } = require('./../../../mongo/user');

module.exports = {
  user: (_, { userId }) => getUser(userId),
};
