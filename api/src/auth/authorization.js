const extractUserFromContext = ctx => ctx.bearer || {};
const extractTokenFromContext = ctx => ctx.bearerToken;
const extractUserIdFromContext = ctx => extractUserFromContext(ctx).userId;


const notAuthorizedError = () => new Error('NotAuthorized');

const isLoggedIn = ctx => !!ctx.bearer;


module.exports = {
  extractUserIdFromContext,
  extractTokenFromContext,
  notAuthorizedError,
  isLoggedIn,
};
