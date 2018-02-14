const extractUserFromContext = ctx => ctx.bearer || {};
const extractTokenFromContext = ctx => ctx.bearerToken;
const extractUserIdFromContext = ctx => extractUserFromContext(ctx).userId;

const isUserToken = ctx => {
  const user = extractUserFromContext(ctx);
  return !!user && ('userId' in user);
};

const notAuthorizedError = () => new Error('NotAuthorized');

const authorizeResolver = resolver => (...args) => resolver(...args);

const isAuthorizedId = (spaceId, ctx) => {
  const { isAdmin, spaceIds = [] } = extractUserFromContext(ctx);
  if (isAdmin) {
    return true;
  }
  const haveSpace = spaceIds.find(id => id.toString() === spaceId.toString());
  return !!haveSpace;

};

const isAuthorized = (space, ctx) => {
  const { _id = null } = (space || {});
  return isAuthorizedId(_id, ctx);
};

const isLoggedIn = ctx => !!extractUserFromContext(ctx);

const canCreateSpace = ctx => isUserToken(ctx);

const canEditSpace = (ctx, spaceId) =>
  isUserToken(ctx) && isAuthorizedId(spaceId, ctx);

const canCreateImage = (ctx, spaceId) =>
  isAuthorizedId(spaceId, ctx);

const isAdminToken = ctx => {
  const { isAdmin } = extractUserFromContext(ctx);
  return isAdmin;
};

module.exports = {
  authorizeResolver,
  isAuthorized,
  isAuthorizedId,
  extractUserFromContext,
  extractUserIdFromContext,
  extractTokenFromContext,
  notAuthorizedError,
  isLoggedIn,
  isUserToken,
  isAdminToken,
  canCreateSpace,
  canEditSpace,
  canCreateImage,
};
