const expressjwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const getUser = require('./../mongo/user/get-user');
const crypto = require('crypto');


const generateUserToken = user => {
  const { tokenSecret, _id } = user;

  if (!tokenSecret || !_id) {
    throw new Error('Invalid user provided when generating token');
  }

  return jwt.sign({
    type: 'user',
    userId: _id,
  }, tokenSecret);
};


const secretCallback = (req, payload, done) => {
  const { userId } = payload;
  getUser(userId).then(user => {
    if (!user) {
      done(new Error('missing_token'));
      return;
    }

    const { tokenSecret } = user;
    done(null, tokenSecret);
  }).catch(err => {
    done(err);
  });
};


const parseTokenFromRequest = req => {
  if (!req.headers || !req.headers.authorization) {
    return null;
  }

  const [scheme, token] = req.headers.authorization.split(' ');

  // Only bearer schema is supported.
  if (!/^Bearer$/i.test(scheme)) {
    return null;
  }

  return token;
};

const populateReqWithAuthDetails = (req, res, next) => {
  if (!req.auth) {
    req.context = { bearer: null };
    next();
  } else {
    req.context = {
      bearer: {
        userId: req.auth.userId,
      },
      bearerToken: parseTokenFromRequest(req),
    };
    next();
  }
};

// Generates a 20 character long secret
const generateSecret = () =>
  crypto.randomBytes(10).toString('hex');

const verifyToken = (req, res, next) => {
  const verifier = expressjwt({
    secret: secretCallback,
    requestProperty: 'auth',
    credentialsRequired: false,
  });

  // catch all jwt errors.
  // jwt throws error in their middleware, for example if the signature changed.
  // We handle this as if the user did not provide token at all.

  verifier(req, res, (/* a, b, c */) => {
    next();
  });
};

module.exports = {
  middlewares: {
    verifyToken,
    populateRequest: populateReqWithAuthDetails,
  },

  generateUserToken,
  generateSecret,
};
