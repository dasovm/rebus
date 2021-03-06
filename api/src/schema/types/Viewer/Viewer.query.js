const { getUser } = require('./../../../data/user');
const { extractTokenFromContext, extractUserIdFromContext } = require('./../../../auth/authorization');

module.exports = {
  viewer: (_, __, ctx) => {
    const userId = extractUserIdFromContext(ctx);
    const token = extractTokenFromContext(ctx);

    return getUser(userId)
      .then(user => ({ token, user }));
  },
};
