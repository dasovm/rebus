const extractUserFromContext = ctx => ctx.bearer || {};
const extractTokenFromContext = ctx => ctx.bearerToken;
const extractUserIdFromContext = ctx => extractUserFromContext(ctx).userId;


const notAuthorizedError = () => new Error('NotAuthorized');

const isLoggedIn = ctx => !!extractUserFromContext(ctx);


module.exports = {
  extractUserIdFromContext,
  extractTokenFromContext,
  notAuthorizedError,
  isLoggedIn,
};
