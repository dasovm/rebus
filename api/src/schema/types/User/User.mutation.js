const { createUser, getUser } = require('./../../../data/user');
const { fetchProfile, fetchPictures, errors: { FacebookAuthError } } = require('./../../../lib/facebook');
const { generateUserToken } = require('./../../../auth/authentication');
const { extractUserIdFromContext } = require('./../../../auth/authorization');

const _fetchProfile = ({ fbToken, ...rest }) => fetchProfile(fbToken)
  .then(profile => ({ fbToken, profile, ...rest }));

const _fetchPictures = ({ fbToken, ...rest }) => fetchPictures(fbToken)
  .then(images => ({ fbToken, images, ...rest }));

const _createUser = ({ fbToken, profile, ...rest }) => createUser({
  facebookToken: fbToken,
  ...profile,
}).then(user => ({ user, fbToken, ...rest }));


const _generateToken = ({ user, ...rest }) => ({ user, ...rest, jwtToken: generateUserToken(user) });


module.exports = {
  // todo: This should also log the user in and connect
  // to correct user if the user has already registered (on this endpoint)

  login: (_, { token }, ctx) =>
    Promise.resolve({ fbToken: token })
      .then(_fetchProfile)
      .then(_fetchPictures)
      .then(_createUser)
      .then(_generateToken)
      .then(({ user, jwtToken }) => ({ user, token: jwtToken }))
      .catch(err => {
        if (err instanceof FacebookAuthError) {
          throw err;
        } else {
          console.error(err);
          throw new Error('Unknown error.');
        }
      }),

};
